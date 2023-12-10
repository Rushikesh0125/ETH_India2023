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
    args[0] = constants?.router;
  } else if (
    contractName == "CrossChainTokenZ" ||
    contractName == "CrossChainTokenBurnableZ" ||
    contractName == "CrossChainTokenMintableZ" ||
    contractName == "CrossChainTokenNoRolesZ" ||
    contractName == "CrossChainNFTZ" ||
    contractName == "CrossChainNFTBurnableZ" ||
    contractName == "CrossChainNFTMintableZ" ||
    contractName == "CrossChainNFTNoRolesZ"
  ) {
    args[0] = constants?.connectorAddress;
    args[1] = constants?.zetaConsumerAddress;
    args[2] = constants?.zetaTokenAddress;
  }
  return args;
};
