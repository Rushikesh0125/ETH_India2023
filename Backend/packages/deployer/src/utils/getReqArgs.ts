import { UserArgsType } from "../types/userArgsType";
import { getContractArgs } from "./getContractArgs";

export const getReqArgs = async (
  contractName: string,
  netWork: string,
  userArgs: UserArgsType,
  chainsToBeDeployedOn: any[]
) => {
  const intialArgs: any[] = await getContractArgs(contractName, netWork);
  let args: readonly any[] = [];
  let chainId = 0;
  if (contractName.includes("NFT")) {
    chainId =
      chainsToBeDeployedOn[0] == "goerli"
        ? 5
        : chainsToBeDeployedOn[0] == "sepolia"
        ? 11155111
        : chainsToBeDeployedOn[0] == "mumbai"
        ? 80001
        : 97;
    if (contractName.includes("NoRoles")) {
      args = [
        ...intialArgs,
        userArgs.name,
        userArgs.symbol,
        userArgs.uri,
        userArgs.supply,
        chainId,
        chainsToBeDeployedOn[1],
        chainsToBeDeployedOn[2],
      ];
    } else {
      args = [
        ...intialArgs,
        userArgs.minter,
        userArgs.name,
        userArgs.symbol,
        userArgs.uri,
        userArgs.supply,
        chainId,
        chainsToBeDeployedOn[1],
        chainsToBeDeployedOn[2],
      ];
    }
  } else if (contractName.includes("Token")) {
    if (contractName.includes("NoRoles")) {
      args = [...intialArgs, userArgs.name, userArgs.symbol];
    } else {
      args = [...intialArgs, userArgs.minter, userArgs.name, userArgs.symbol];
    }
  }
  return args;
};
