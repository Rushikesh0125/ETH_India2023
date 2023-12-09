"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDeployer = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const getReqArgs_1 = require("./utils/getReqArgs");
const getContractName_1 = require("./utils/getContractName");
const inputTypes_1 = require("./types/inputTypes");
const Create3ABI_1 = require("./ABI/Create3ABI");
const getABI_1 = require("./utils/getABI");
const getProviderURL_1 = require("./utils/getProviderURL");
const fs = __importStar(require("node:fs"));
const runDeployer = async (clientData) => {
    const protocolType = clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";
    console.log("1");
    const data = {
        minter: "0x65bFE037d16189142D2BcC288a6Db3e6e27F6408",
        name: clientData.tokenName,
        symbol: clientData.tokenSymbol,
        uri: clientData.uri,
        supply: clientData.tokenSupply,
        tokenFetures: clientData.tokenFeatures,
    };
    const provider = new ethers_1.ethers.providers.JsonRpcProvider((0, getProviderURL_1.getProviderURLs)("sepolia"));
    const contractName = (0, getContractName_1.getContractName)(clientData.type, protocolType, data) || "";
    const chainsToBeDeployedOn = clientData.tokenChains;
    console.log("2");
    const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
    //const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
    const deployerContract = new ethers_1.ethers.Contract(deployerAddress, Create3ABI_1.ABI, new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY || "", provider));
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
    console.log("3");
    let deployedAddressArray = [];
    let seed = 1;
    //const signer = provider.getSigner();
    const wallet = new ethers_1.Wallet(process.env.PRIVATE_KEY || "", provider);
    console.log("4");
    let constructorArguments = await (0, getReqArgs_1.getReqArgs)(contractName, "sepolia", data, ["sepolia", seed, chainsToBeDeployedOn.length]);
    seed++;
    const contractToDeployFactory = new ethers_1.ethers.ContractFactory((0, getABI_1.getABI)(contractName).abi, (0, getABI_1.getABI)(contractName).bytecode, wallet);
    console.log("5");
    const salt = ethers_1.ethers.utils.hexZeroPad((0, utils_1.toUtf8Bytes)("100"), 32);
    const abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
    const creationCode = ethers_1.ethers.utils.solidityPack(["bytes", "bytes"], [
        contractToDeployFactory.bytecode,
        abiCoder.encode(argType(), constructorArguments),
    ]);
    console.log("6");
    const deployedAddress = await deployerContract.callStatic.deploy(creationCode, salt);
    console.log("7");
    deployedAddressArray[0] = deployedAddress;
    fs.writeFile("address.json", deployedAddress, () => { });
    return deployedAddressArray;
};
exports.runDeployer = runDeployer;
