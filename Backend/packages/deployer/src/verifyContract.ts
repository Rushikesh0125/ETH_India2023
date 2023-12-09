import { HardhatRuntimeEnvironment } from "hardhat/types";

export const verifyContract = async (
  contractName: string,
  contractAddress: string,
  contractArgs: any[],
  chains: string[],
  hre: HardhatRuntimeEnvironment
) => {
  for (let i = 0; i < chains.length; i++) {
    console.log(`getting ready to verify on ${chains[i]}`);
    const dir = getDir(contractName);
    await hre.run("verify:verify", {
      network: chains[i],
      address: contractAddress,
      contract: `${dir}/${contractName}.sol:${contractName}`,
      contractArgs,
    });
  }
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
