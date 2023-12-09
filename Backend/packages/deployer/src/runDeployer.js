"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDeployer = void 0;
const ethers_1 = require("ethers");
const getReqArgs_1 = require("./utils/getReqArgs");
const getContractName_1 = require("./utils/getContractName");
const inputTypes_1 = require("./types/inputTypes");
const getABI_1 = require("./utils/getABI");
const getProviderURL_1 = require("./utils/getProviderURL");
const runDeployer = async (clientData) => {
    const protocolType = clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";
    const data = {
        minter: clientData.minter,
        name: clientData.tokenName,
        symbol: clientData.tokenSymbol,
        uri: clientData.uri,
        supply: clientData.tokenSupply,
        tokenFetures: clientData.tokenFeatures,
    };
    const chainsToBeDeployedOn = clientData.tokenChains;
    let deployedAddressArray = [];
    for (let i = 0; i < chainsToBeDeployedOn.length; i++) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider((0, getProviderURL_1.getProviderURLs)(chainsToBeDeployedOn[i]));
        const contractName = (0, getContractName_1.getContractName)(clientData.type, protocolType, data) || "";
        const argType = () => {
            if (clientData.type == "ERC20") {
                if (contractName.charAt(-5) == "Z") {
                    if (contractName.includes("NoRoles")) {
                        return inputTypes_1.InputTypes.inputTypeERC20ZNR;
                    }
                    else {
                        return inputTypes_1.InputTypes.inputTypeERC20Z;
                    }
                }
                else {
                    if (contractName.includes("NoRoles")) {
                        return inputTypes_1.InputTypes.inputTypeERC20NR;
                    }
                    else {
                        return inputTypes_1.InputTypes.inputTypeERC20;
                    }
                }
            }
            else if (clientData.type == "ERC721") {
                if (contractName.charAt(-5) == "Z") {
                    if (contractName.includes("NoRoles")) {
                        return inputTypes_1.InputTypes.inputTypeERC721ZNR;
                    }
                    else {
                        return inputTypes_1.InputTypes.inputTypeERC721Z;
                    }
                }
                else {
                    if (contractName.includes("NoRoles")) {
                        return inputTypes_1.InputTypes.inputTypeERC721NR;
                    }
                    else {
                        return inputTypes_1.InputTypes.inputTypeERC721;
                    }
                }
            }
            const nullType = [];
            return nullType;
        };
        let seed = 1;
        //const signer = provider.getSigner();
        const wallet = new ethers_1.Wallet(process.env.PRIVATE_KEY || "", provider);
        let constructorArguments = await (0, getReqArgs_1.getReqArgs)(contractName, chainsToBeDeployedOn[i], data, [chainsToBeDeployedOn[i], seed, chainsToBeDeployedOn.length]);
        seed++;
        const contractToDeployFactory = new ethers_1.ethers.ContractFactory((0, getABI_1.getABI)(contractName).abi, (0, getABI_1.getABI)(contractName).bytecode, wallet);
        const tx = await contractToDeployFactory.deploy(...constructorArguments);
        deployedAddressArray[i] = tx.address;
    }
    return deployedAddressArray;
};
exports.runDeployer = runDeployer;
