import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import Contract from "./components/Contract";
import GetStarted from "./components/GetStarted";
// import Header from "./components/Header";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <Header /> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/contract" element={<Contract />} />
            <Route
              path="/connect"
              element={
                <div className="p-20">
                  <ConnectWallet />

                  {/* <SafeAuth /> */}
                </div>
              }
            />
          </Routes>
        </BrowserRouter>

        {/* <GetStarted /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
