import "./App.css";
// import ConnectWallet from "./components/ConnectWallet";
import Contract from "./components/Contract";
import GetStarted from "./components/GetStarted";
import Header from "./components/Header";
import "./index.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import SafeAuth from "./components/SafeAuth";
import PdfRender from "./components/PdfRender";

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
            <Route path="/showcase" element={<PdfRender />} />
          </Routes>

          <Link
          to="/showcase"
          className="fixed right-4 top-4 inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
          <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            Showcase
          </span>
        </Link>
        </BrowserRouter>

        {/* <GetStarted /> */}
        
      </div>
    </QueryClientProvider>
  );
}

export default App;

{
  /* <Route
path="/connect"
element={
  <div className="p-20">
    <ConnectWallet />
    <SafeAuth />
  </div>
}
/> */
}
