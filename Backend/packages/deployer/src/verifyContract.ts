import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export const verifyContract = async (
  contractName: string,
  contractAddress: string,
  contractArgs: any[],
  chain: string,
  hre: HardhatRuntimeEnvironment
) => {
  console.log(`getting ready to verify on ${chain}`);
  let dir = getDir(contractName);
  if (contractName.charAt(contractName.length - 1) == "Z") {
    dir = dir + `/Zetachain/${contractName}Z.sol:${contractName}`;
  } else {
    dir = dir + `/CCIP/${contractName}.sol:${contractName}`;
  }
  await hre.run("verify:verify", {
    network: chain,
    address: contractAddress,
    contract: dir,
    contractArgs,
  });
};

const getDir = (contractName: string) => {
  switch (contractName) {
    case "CrossChainToken" ||
      "CrossChainTokenBurnable" ||
      "CrossChainTokenMintable" ||
      "CrossChainTokenNoRoles":
      return "ERC20";
    case "CrossChainNFT" ||
      "CrossChainNFTBurnable" ||
      "CrossChainNFTMintable" ||
      "CrossChainNFTNoRoles":
      return "ERC721";
    default:
      break;
  }
};
