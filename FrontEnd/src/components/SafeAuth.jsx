import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { EthHashInfo } from "@safe-global/safe-react-components";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
// import AppBar from './AppBar'
import {
  AuthKitSignInData,
  SafeAuthInitOptions,
  SafeAuthPack,
  SafeAuthUserInfo,
} from "@safe-global/auth-kit";
import Button from "./Button";
import { Context } from "../context/Context";
import GoogleButton from "react-google-button";

// import { getSafeTxV4TypedData, getTypedData, getV3TypedData } from './typedData'

function SafeAuth() {
  const [safeAuthPack, setSafeAuthPack] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!safeAuthPack?.isAuthenticated
  );
  const { safeAuthResp, setSafeAuthResp } = useContext(Context);
  // const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [chainId, setChainId] = useState();
  const [balance, setBalance] = useState();
  const [consoleMessage, setConsoleMessage] = useState("");
  const [consoleTitle, setConsoleTitle] = useState("");
  const [provider, setProvider] = useState();

  useEffect(() => {
    // @ts-expect-error - Missing globals
    const params = new URL(window.document.location).searchParams;
    const chainId = params.get("chainId");

    console.log("chainId", chainId);

    (async () => {
      const options = {
        enableLogging: true,
        buildEnv: "production",
        chainConfig: {
          chainId: chainId || "0x64",
          rpcTarget: "https://gnosis.drpc.org",
        },
      };

      const authPack = new SafeAuthPack();

      await authPack.init(options);

      console.log("safeAuthPack:safeEmbed", authPack.safeAuthEmbed);

      setSafeAuthPack(authPack);

      authPack.subscribe("accountsChanged", async (accounts) => {
        console.log(
          "safeAuthPack:accountsChanged",
          accounts,
          authPack.isAuthenticated
        );
        if (authPack.isAuthenticated) {
          const signInInfo = await authPack?.signIn();

          setSafeAuthResp(signInInfo);
          setIsAuthenticated(true);
        }
      });

      authPack.subscribe("chainChanged", (eventData) =>
        console.log("safeAuthPack:chainChanged", eventData)
      );
    })();
  }, []);

  useEffect(() => {
    if (!safeAuthPack || !isAuthenticated) return;
    (async () => {
      const web3Provider = safeAuthPack.getProvider();
      const userInfo = await safeAuthPack.getUserInfo();

      setUserInfo(userInfo);

      if (web3Provider) {
        const provider = new BrowserProvider(safeAuthPack.getProvider());
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        setChainId((await provider?.getNetwork()).chainId.toString());
        setBalance(
          ethers.formatEther(await provider.getBalance(signerAddress))
        );
        setProvider(provider);
      }
    })();
  }, [isAuthenticated]);

  const login = async (provider) => {
    const signInInfo = await safeAuthPack?.signIn({ loginProvider: provider });

    setSafeAuthResp(signInInfo);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await safeAuthPack?.signOut();

    setSafeAuthResp(null);
  };

  const getUserInfo = async () => {
    const userInfo = await safeAuthPack?.getUserInfo();

    uiConsole("User Info", userInfo);
  };

  const getAccounts = async () => {
    const accounts = await provider?.send("eth_accounts", []);

    uiConsole("Accounts", accounts);
  };

  const getChainId = async () => {
    const chainId = await provider?.send("eth_chainId", []);

    uiConsole("ChainId", chainId);
  };

  const signAndExecuteSafeTx = async (index) => {
    const safeAddress = safeAuthResp?.safes?.[index] || "0x";

    // Wrap Web3Auth provider with ethers
    const provider = new BrowserProvider(safeAuthPack?.getProvider());
    const signer = await provider.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const protocolKit = await Safe.create({
      safeAddress,
      ethAdapter,
    });

    // Create transaction
    let tx = await protocolKit.createTransaction({
      transactions: [
        {
          to: ethers.getAddress(safeAuthResp?.eoa || "0x"),
          data: "0x",
          value: ethers.parseUnits("0.0001", "ether").toString(),
        },
      ],
    });

    // Sign transaction. Not necessary to execute the transaction if the threshold is one
    // but kept to test the sign transaction modal
    tx = await protocolKit.signTransaction(tx);

    // Execute transaction
    const txResult = await protocolKit.executeTransaction(tx);
    uiConsole("Safe Transaction Result", txResult);
  };

  const signMessage = async (data, method) => {
    let signedMessage;

    const params = {
      data,
      from: safeAuthResp?.eoa,
    };

    if (method === "eth_signTypedData") {
      signedMessage = await provider?.send(method, [params.data, params.from]);
    } else if (
      method === "eth_signTypedData_v3" ||
      method === "eth_signTypedData_v4"
    ) {
      signedMessage = await provider?.send(method, [
        params.from,
        JSON.stringify(params.data),
      ]);
    } else {
      signedMessage = await (await provider?.getSigner())?.signMessage(data);
    }

    uiConsole("Signed Message", signedMessage);
  };

  const sendTransaction = async () => {
    const tx = await provider?.send("eth_sendTransaction", [
      {
        from: safeAuthResp?.eoa,
        to: safeAuthResp?.eoa,
        value: ethers.parseUnits("0.00001", "ether").toString(),
        gasLimit: 21000,
      },
    ]);

    uiConsole("Transaction Response", tx);
  };

  const switchChain = async () => {
    const result = await provider?.send("wallet_switchEthereumChain", [
      {
        chainId: "0x1",
      },
    ]);

    uiConsole("Switch Chain", result);
  };

  const addChain = async () => {
    const result = await provider?.send("wallet_addEthereumChain", [
      {
        chainId: "0x2105",
        chainName: "Base",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://base.publicnode.com"],
        blockExplorerUrls: ["https://basescan.org/"],
      },
    ]);

    uiConsole(`Add chain`, result);
  };

  const uiConsole = (title, message) => {
    setConsoleTitle(title);
    setConsoleMessage(
      typeof message === "string" ? message : JSON.stringify(message, null, 2)
    );
  };

  console.log("safeAuthSignInResponse", safeAuthResp);
  return (
    <>
      <div className="p-4">
        {/* <h1>Safe Auth</h1> */}
        <div className="flex flex-col gap-4 items-center">
          <GoogleButton onClick={() => login("google")} />
          {/* <Button onClick={() => login("google")}>
            login with safeauth - google
          </Button> */}

          {safeAuthResp ? (
            <p className="p-2 bg-yellow-100 px-6 rounded-xl font-bold">
              {safeAuthResp ? JSON.stringify(safeAuthResp, null, 2) : null}
            </p>
          ) : (
            null
          )}
          {/* <Button onClick={() => login("google")}>
            login with safeauth - github
          </Button> */}
        </div>
      </div>
      {/* <AppBar
        onLogin={login}
        onLogout={logout}
        userInfo={userInfo || undefined}
        isLoggedIn={!!safeAuthPack?.isAuthenticated}
      /> */}
      {/* {safeAuthSignInResponse?.eoa && (
        <Grid container>
          <Grid item md={4} p={4}>
            <Typography variant="h3" color="secondary" fontWeight={700}>
              Signer
            </Typography>
            <Divider sx={{ my: 3 }} />
            <EthHashInfo address={safeAuthSignInResponse.eoa} showCopyButton showPrefix={false} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4" color="primary" fontWeight="bold">
              Chain{' '}
              <Typography component="span" color="secondary" fontSize="1.45rem">
                {chainId}
              </Typography>
            </Typography>
            <Typography variant="h4" color="primary" sx={{ my: 1 }} fontWeight="bold">
              Balance{' '}
              <Typography component="span" color="secondary" fontSize="1.45rem">
                {balance}
              </Typography>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
              onClick={() => getUserInfo()}
            >
              getUserInfo
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => getAccounts()}
            >
              eth_accounts
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => getChainId()}
            >
              eth_chainId
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => signMessage('Hello World', 'personal_sign')}
            >
              personal_sign
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() =>
                signMessage(
                  '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad',
                  'eth_sign'
                )
              }
            >
              eth_sign
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => signMessage(getTypedData(), 'eth_signTypedData')}
            >
              eth_signTypedData
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => signMessage(getV3TypedData(chainId || ''), 'eth_signTypedData_v3')}
            >
              eth_signTypedData_v3
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() =>
                signMessage(getSafeTxV4TypedData(chainId || ''), 'eth_signTypedData_v4')
              }
            >
              eth_signTypedData_v4
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ my: 1 }}
              onClick={() => sendTransaction()}
            >
              eth_sendTransaction
            </Button>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
              onClick={() => switchChain()}
            >
              wallet_switchEthereumChain
            </Button>{' '}
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              sx={{ my: 1 }}
              onClick={() => addChain()}
            >
              wallet_addEthereumChain
            </Button>
          </Grid>
          <Grid item md={3} p={4}>
            <>
              <Typography variant="h3" color="secondary" fontWeight={700}>
                Safe accounts
              </Typography>
              <Divider sx={{ my: 2 }} />
              {safeAuthSignInResponse?.safes?.length ? (
                safeAuthSignInResponse?.safes?.map((safe, index) => (
                  <>
                    <Box sx={{ my: 3 }} key={index}>
                      <EthHashInfo address={safe} showCopyButton shortAddress={true} />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      onClick={() => signAndExecuteSafeTx(index)}
                    >
                      Sign and execute
                    </Button>
                    <Divider sx={{ my: 3 }} />
                  </>
                ))
              ) : (
                <Typography variant="body1" color="secondary" fontWeight={700}>
                  No Available Safes
                </Typography>
              )}
            </>
          </Grid>
          <Grid item md={5} p={4}>
            <Typography variant="h3" color="secondary" fontWeight={700}>
              Console
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" color="primary" fontWeight={700}>
              {consoleTitle}
            </Typography>
            <Typography
              variant="body1"
              color="secondary"
              sx={{ mt: 2, overflowWrap: 'break-word' }}
            >
              {consoleMessage}
            </Typography>
          </Grid>
        </Grid>
      )} */}
    </>
  );
}

export default SafeAuth;
