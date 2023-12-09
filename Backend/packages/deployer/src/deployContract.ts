import { task } from "hardhat/config";
import { getContractArgs } from "./utils/getContractArgs";
import { getProviderURLs } from "./utils/getProviderURL";
import HardhatEthersSigner from "@nomicfoundation/hardhat-toolbox";
import { BaseContract, BigNumber, Signer, ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { toUtf8Bytes } from "ethers/lib/utils";

export const deployContract = async (
  contractName: string,
  chains: string[],
  signer: Signer,
  args: any[],
  argTypes: any[],
  hre: HardhatRuntimeEnvironment
) => {
  let contractAddresses: any[] = [];

  const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
  const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
  const deployerAbi = abi;
  const deployerBytecode = bytecode;

  for (let i = 0; i < chains.length; i++) {
    const deployerContract = new hre.ethers.Contract(
      deployerAddress,
      deployerAbi,
      signer
    );

    const { abi, bytecode } = await hre.artifacts.readArtifact(contractName);

    const salt = ethers.utils.hexZeroPad(toUtf8Bytes("100"), 32);

    const abiCoder = ethers.utils.defaultAbiCoder;

    const creationCode = ethers.utils.solidityPack(
      ["bytes", "bytes"],
      [bytecode, abiCoder.encode(argTypes, args)]
    );

    const deployedAddress = await deployerContract.callStatic.deploy(
      creationCode,
      salt
    );

    console.log(`${chains[i]}, address: ${deployedAddress}`);

    contractAddresses[i] = deployedAddress;
  }

  return contractAddresses;
};
