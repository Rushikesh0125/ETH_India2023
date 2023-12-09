import { useContext } from "react";
import { Context } from "../context/Context";
import ERC721_details from "./ERC721_details";
import ERC20_details from "./ERC20_details";
import clsx from "clsx";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const contracts = [
    { title: "NFT (ERC-721)", card: "ERC721", id: "NFT_CARD" },
    { title: "Token (ERC-20)", card: "ERC20", id: "TOKEN_CARD" },
  ];

  const { contract_details_open, open_erc_20, open_erc_721 } =
    useContext(Context);

  console.log(contract_details_open);
  return (
    <div className="pt-[100px] w-full bg-emerald-500" id="getstarted">
      <h1 className="text-center text-[45px]">Let&rsquo;s Get started</h1>

      <div className="flex p-[130px] pt-[50px] flex-col items-start justify-start">
        <p className="text-[25px]">Select a contract: </p>
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
              "text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-blue-600";
            const className = clsx(common, {
              "bg-blue-800 ring-4 outline-none ring-blue-900":
                contract_details_open == el.card,
              "bg-blue-500": contract_details_open != el.card,
            });

            return (
              <button
                onClick={openCard}
                key={el.id}
                type="button"
                className={className}
              >
                {el.title}
              </button>

              // <ContractCard key={i} title={el.title} card={el.card} id={el.id} />
            );
          })}
        </div>
        <div className="contracts_detals">
          {contract_details_open && (
            <ERC20_details type={contract_details_open} />
          )}
        </div>

         <Link to="/contract">contract</Link>
      </div>
    </div>
  );
};

export default GetStarted;
