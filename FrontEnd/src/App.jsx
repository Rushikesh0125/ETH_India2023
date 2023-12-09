import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import GetStarted from "./components/GetStarted";
import Header from "./components/Header";
import "./index.css";

function App() {
  return (
    <div>
      <Header />
      <div className="p-20">
      <ConnectWallet />

      </div>

      <GetStarted />
    </div>
  );
}

export default App;
