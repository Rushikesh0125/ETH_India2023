import { useContext } from "react";
import ContractCard from "./ContractCard";
import { Context } from "../context/Context";
import ERC721_details from "./ERC721_details";
import ERC20_details from "./ERC20_details";

const GetStarted = () => {
  const contracts = [
    { title: "NFT (ERC-721)", card: "ERC721", id: "NFT_CARD" },
    { title: "Token (ERC-20)", card: "ERC20", id: "TOKEN_CARD" },
  ];

  const { contract_details_open } = useContext(Context);
  return (
    <div className="pt-[100px] w-full bg-emerald-500" id="getstarted">
      <h1 className="text-center text-[45px]">Let&rsquo;s Get started</h1>

      <div className="flex p-[130px] pt-[50px] flex-col items-start justify-start">
        <p className="text-[25px]">Select a contract: </p>
        <div className="flex gap-[20px] m-[20px] ml-[0px]">
          {contracts.map((el, i) => (
            <ContractCard key={i} title={el.title} card={el.card} id={el.id} />
          ))}
        </div>
        <div className="contracts_detals">
          <div id="ERC721">
            {contract_details_open == "ERC721" && <ERC721_details />}
          </div>
          <div id="ERC20">
            {contract_details_open == "ERC20" && <ERC20_details />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
