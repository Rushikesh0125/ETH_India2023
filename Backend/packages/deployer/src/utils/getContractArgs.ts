import { ethers } from "ethers";
import { CONSTANTS } from "./getConstants";
require("dotenv").config();

export const getContractArgs = async (
  contractName: string,
  networkName: string
) => {
  const constants = await CONSTANTS(networkName);
  let args: Array<any> = [];
  if (
    contractName == "CrossChainToken" ||
    contractName == "CrossChainTokenBurnable" ||
    contractName == "CrossChainTokenMintable" ||
    contractName == "CrossChainTokenNoRoles" ||
    contractName == "CrossChainNFT" ||
    contractName == "CrossChainNFTBurnable" ||
    contractName == "CrossChainNFTMintable" ||
    contractName == "CrossChainNFTNoRoles"
  ) {
    args[1] = constants?.router;
  }
  return args;
};
