import * as fs from "node:fs";
import * as path from "path";

type fileType = {
  abi: any[];
  bytecode: any;
};

export const getABI = (contractName: string) => {
  const dir = contractName.includes("NFT") ? "ERC721" : "ERC20";

  const proto =
    contractName.charAt(contractName.length - 1) == "Z" ? "Zetachain" : "CCIP";

  const filePath = path.join(
    __dirname,
    "../../artifacts/contracts",
    dir,
    proto,
    `${contractName}.sol`,
    `${contractName}.json`
  );

  //const path = require(`../../artifacts/contracts/${dir}/${proto}/${contractName}.sol/${contractName}.json`);
  const file = fs.readFileSync(filePath);
  const data = JSON.parse(file.toString()) as fileType;
  return data;
};
