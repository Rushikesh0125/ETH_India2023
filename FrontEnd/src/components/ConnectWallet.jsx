import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, data } = useConnect({
    connector: new InjectedConnector(),
  });

  console.log("data is", data);
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  return (
    <button
      type="button"
      onClick={connect}
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Connect Wallet
    </button>
  );
}

export default ConnectWallet;
