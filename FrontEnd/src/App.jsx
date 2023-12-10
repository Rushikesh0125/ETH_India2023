import "./App.css";
// import ConnectWallet from "./components/ConnectWallet";
import Contract from "./components/Contract";
import GetStarted from "./components/GetStarted";
import Header from "./components/Header";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import SafeAuth from "./components/SafeAuth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Toaster />

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <SafeAuth />

                  <GetStarted />
                </>
              }
            />
            <Route path="/contract" element={<Contract />} />
         
          </Routes>
        </BrowserRouter>

        {/* <GetStarted /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;


{/* <Route
path="/connect"
element={
  <div className="p-20">
    <ConnectWallet />
    <SafeAuth />
  </div>
}
/> */}