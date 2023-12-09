"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyContract = void 0;
const verifyContract = async (contractName, contractAddress, contractArgs, chains, hre) => {
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
