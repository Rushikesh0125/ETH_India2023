import { Wallet, ethers } from "ethers";
import { getABI } from "./utils/getABI";
import { getProviderURLs } from "./utils/getProviderURL";

const setInteractor = async (
  contractName: string,
  contractAddresses: string[],
  chains: string[]
) => {
  const data = getABI(contractName);

  for (let i = 0; i < chains.length; i++) {
    const provider = new ethers.providers.JsonRpcProvider(
      getProviderURLs(chains[i])
    );
    const wallet = new Wallet(process.env.PRIVATE_KEY || "", provider);
    const contractInst = new ethers.Contract(
      contractAddresses[i],
      data.abi,
      wallet
    );
    for (let j = 0; j < chains.length; j++) {
      if (i == j) continue;
      const tx1 = await contractInst.setInteractorByChainId(
        chains[j] == "goerli" ? 5 : chains[j] == "mumbai" ? 80001 : 97,
        true
      );

      tx1.wait();
    }
  }
};
