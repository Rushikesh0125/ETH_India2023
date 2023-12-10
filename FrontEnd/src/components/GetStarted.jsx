import { useContext } from "react";
import { Context } from "../context/Context";
// import ERC721_details from "./ERC721_details";
import ERC20_details from "./ERC20_details";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "./Button";
const contracts = [
  { title: "NFT (ERC-721)", card: "ERC721", id: "NFT_CARD" },
  { title: "Token (ERC-20)", card: "ERC20", id: "TOKEN_CARD" },
];
const GetStarted = () => {
  const { contract_details_open, open_erc_20, open_erc_721 } =
    useContext(Context);

  console.log(contract_details_open);
  return (
    <div className="p-10 sm:p-20 lg:p-40 w-full bg-red-300" id="getstarted">
      {/* <h1 className="uppercase text-center text-[45px] font-exo">Let&rsquo;s Get started</h1> */}

      <div className="flex flex-col items-start justify-start">
        <p className="text-4xl mb-6 font-exo font-semibold">Select a contract: </p>
        <div className="flex gap-[20px] m-[20px] ml-[0px]">
          {contracts.map((el) => {
            const openCard = () => {
              if (el.card == "ERC721") {
                open_erc_721();
              } else {
                open_erc_20();
              }
            };

            const common =
              "text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-red-600";
            const className = clsx(common, {
              "bg-red-800 ring-4 outline-none ring-red-900 scale-105 transition-all duration-300 ease-in-out":
                contract_details_open == el.card,
              "bg-red-500": contract_details_open != el.card,
            });

            return (
              <button
                onClick={openCard}
                // className="transition duration-500 ease-in-out"
                key={el.id}
                type="button"
                className={className}
              >
                {el.title}
              </button>

         
            );
          })}
        </div>
        <div className="contracts_detals">
          {contract_details_open && (
            <ERC20_details type={contract_details_open} />
          )}
        </div>

        <Link to="/contract">
          <Button>Contracts</Button>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
