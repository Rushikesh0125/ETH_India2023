"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyContract = void 0;
const verifyContract = async (contractName, contractAddress, contractArgs, chain, hre) => {
    console.log(`getting ready to verify on ${chain}`);
    let dir = getDir(contractName);
    if (contractName.charAt(contractName.length - 1) == "Z") {
        dir = dir + `/Zetachain/${contractName}Z.sol:${contractName}`;
    }
    else {
        dir = dir + `/CCIP/${contractName}.sol:${contractName}`;
    }
    await hre.run("verify:verify", {
        network: chain,
        address: contractAddress,
        contract: dir,
        contractArgs,
    });
};
exports.verifyContract = verifyContract;
const getDir = (contractName) => {
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
