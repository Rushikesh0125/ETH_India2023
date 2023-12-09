import * as fs from "node:fs";

type fileType = {
  abi: any[];
};

export const getABI = (contractName: string) => {
  const dir = contractName.includes("NFT") ? "ERC721" : "ERC20";

  const proto =
    contractName.charAt(contractName.length - 1) == "Z" ? "Zetachain" : "CCIP";

  const path = `../../artifacts/contracts/${dir}/${proto}/${contractName}.sol/${contractName}.json`;
  const dirToRead = fs.readdirSync("../../artifacts/contracts");

  const file = fs.readFileSync(path);
  console.log("file", JSON.parse(file.toString()));

  return path;
};

console.log(getABI("CrossChainNFT"));
