import * as fs from "node:fs";

type fileType = {
  abi: any[];
};

export const getABI = (contractName: string) => {
  const dir = contractName.includes("NFT") ? "ERC721" : "ERC20";

  const proto =
    contractName.charAt(contractName.length - 1) == "Z" ? "Zetachain" : "CCIP";

  const path = `../../artifacts/contracts/${dir}/${proto}/${contractName}.sol/${contractName}.json`;
  let data;
  const file = JSON.parse(fs.readFileSync(path).toString()) as fileType;

  return file.abi;
};

console.log(getABI("CrossChainNFT"));
