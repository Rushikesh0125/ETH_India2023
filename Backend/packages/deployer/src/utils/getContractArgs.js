"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractArgs = void 0;
const getConstants_1 = require("./getConstants");
require("dotenv").config();
const getContractArgs = async (contractName, networkName) => {
    const constants = await (0, getConstants_1.CONSTANTS)(networkName);
    let args = [];
    if (contractName == "CrossChainToken" ||
        contractName == "CrossChainTokenBurnable" ||
        contractName == "CrossChainTokenMintable" ||
        contractName == "CrossChainTokenNoRoles" ||
        contractName == "CrossChainNFT" ||
        contractName == "CrossChainNFTBurnable" ||
        contractName == "CrossChainNFTMintable" ||
        contractName == "CrossChainNFTNoRoles") {
        args[0] = constants?.router;
    }
    else if (contractName == "CrossChainTokenZ" ||
        contractName == "CrossChainTokenBurnableZ" ||
        contractName == "CrossChainTokenMintableZ" ||
        contractName == "CrossChainTokenNoRolesZ" ||
        contractName == "CrossChainNFTZ" ||
        contractName == "CrossChainNFTBurnableZ" ||
        contractName == "CrossChainNFTMintableZ" ||
        contractName == "CrossChainNFTNoRolesZ") {
        args[0] = constants?.connectorAddress;
        args[1] = constants?.zetaConsumerAddress;
        args[2] = constants?.zetaTokenAddress;
    }
    return args;
};
exports.getContractArgs = getContractArgs;
