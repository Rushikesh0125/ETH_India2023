"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployContract = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const deployContract = async (contractName, chains, signer, args, argTypes, hre) => {
    let contractAddresses = [];
    const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
    const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
    const deployerAbi = abi;
    const deployerBytecode = bytecode;
    for (let i = 0; i < chains.length; i++) {
        const deployerContract = new hre.ethers.Contract(deployerAddress, deployerAbi, signer);
        const { abi, bytecode } = await hre.artifacts.readArtifact(contractName);
        const salt = ethers_1.ethers.utils.hexZeroPad((0, utils_1.toUtf8Bytes)("100"), 32);
        const abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
        const creationCode = ethers_1.ethers.utils.solidityPack(["bytes", "bytes"], [bytecode, abiCoder.encode(argTypes, args)]);
        const deployedAddress = await deployerContract.callStatic.deploy(creationCode, salt);
        console.log(`${chains[i]}, address: ${deployedAddress}`);
        contractAddresses[i] = deployedAddress;
    }
    return contractAddresses;
};
exports.deployContract = deployContract;
