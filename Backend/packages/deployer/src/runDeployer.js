"use strict";
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
const runDeployer = async (clientData) => {
    const protocolType = clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";
    const data = {
        minter: "0x65bFE037d16189142D2BcC288a6Db3e6e27F6408",
        name: clientData.tokenName,
        symbol: clientData.tokenSymbol,
        uri: clientData.uri,
        supply: clientData.tokenSupply,
        tokenFetures: clientData.tokenFeatures,
    };
    const contractName = (0, getContractName_1.getContractName)(clientData.type, protocolType, data) || "";
    const chainsToBeDeployedOn = clientData.tokenChains;
    const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
    //const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
    const deployerContract = new ethers_1.ethers.Contract(deployerAddress, Create3ABI_1.ABI);
    // const deployerAbi = abi;
    // const deployerBytecode = bytecode;
    // const deployerContract = new hre.ethers.Contract(
    //   deployerAddress,
    //   deployerAbi,
    //   signer
    // );
    const instance = deployerContract.attach(deployerAddress);
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
    let deployedAddressArray = [];
    let seed = 1;
    for (let i = 0; i < chainsToBeDeployedOn.length; i++) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider((0, getProviderURL_1.getProviderURLs)(chainsToBeDeployedOn[i]));
        const signer = provider.getSigner();
        let constructorArguments = await (0, getReqArgs_1.getReqArgs)(contractName, chainsToBeDeployedOn[i], data, [chainsToBeDeployedOn[i], seed, chainsToBeDeployedOn.length]);
        seed++;
        //const { abi, bytecode } = await hre.artifacts.readArtifact(contractName);
        const contractToDeployFactory = new ethers_1.ethers.ContractFactory((0, getABI_1.getABI)(contractName).abi, (0, getABI_1.getABI)(contractName).bytecode, signer);
        const salt = ethers_1.ethers.utils.hexZeroPad((0, utils_1.toUtf8Bytes)("100"), 32);
        const abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
        const creationCode = ethers_1.ethers.utils.solidityPack(["bytes", "bytes"], [
            contractToDeployFactory.bytecode,
            abiCoder.encode(argType(), constructorArguments),
        ]);
        const deployedAddress = await instance.callStatic.deploy(creationCode, salt);
        deployedAddressArray[i] = deployedAddress;
    }
    return deployedAddressArray;
};
exports.runDeployer = runDeployer;
