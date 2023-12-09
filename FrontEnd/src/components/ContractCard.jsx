/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Context } from "../context/Context";

const ContractCard = ({ title, card, id }) => {
  const { open_erc_20, open_erc_721 } = useContext(Context);

  const openCard = () => {
    if (card == "ERC721") {
      open_erc_721();
    } else {
      open_erc_20();
    }
  };

  return (
    <div
      className="border-2 p-[20px] border-[blue] rounded-[15px] cursor-pointer"
      id={id}
      onClick={openCard}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default ContractCard;
