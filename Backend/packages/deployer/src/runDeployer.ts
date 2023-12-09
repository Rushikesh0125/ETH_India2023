import { Signer, ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ParamType, toUtf8Bytes } from "ethers/lib/utils";
import { UserArgsType } from "./types/userArgsType";
import { getReqArgs } from "./utils/getReqArgs";
import { getContractName } from "./utils/getContractName";
import { InputTypes } from "./types/inputTypes";
import { FormData } from "./types/FormData";
import { ABI } from "./ABI/Create3ABI";
import { getABI } from "./utils/getABI";

export const runDeployer = async (clientData: FormData) => {
  const protocolType =
    clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";

  const data: UserArgsType = {
    minter: "",
    name: clientData.tokenName,
    symbol: clientData.tokenSymbol,
    uri: clientData.uri,
    supply: clientData.tokenSupply,
    tokenFetures: clientData.tokenFeatures,
  };

  const contractName =
    getContractName(clientData.type, protocolType, data) || "";

  const chainsToBeDeployedOn = clientData.tokenChains;

  const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
  //const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
  const deployerContract = new ethers.Contract(deployerAddress, ABI);
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
          return InputTypes.inputTypeERC20ZNR;
        } else {
          return InputTypes.inputTypeERC20Z;
        }
      } else {
        if (contractName.includes("NoRoles")) {
          return InputTypes.inputTypeERC20NR;
        } else {
          return InputTypes.inputTypeERC20;
        }
      }
    } else if (clientData.type == "ERC721") {
      if (contractName.charAt(-5) == "Z") {
        if (contractName.includes("NoRoles")) {
          return InputTypes.inputTypeERC721ZNR;
        } else {
          return InputTypes.inputTypeERC721Z;
        }
      } else {
        if (contractName.includes("NoRoles")) {
          return InputTypes.inputTypeERC721NR;
        } else {
          return InputTypes.inputTypeERC721;
        }
      }
    }
    const nullType: ParamType[] = [];
    return nullType;
  };

  let deployedAddressArray = [];

  let seed = 1;

  for (let i = 0; i < chainsToBeDeployedOn.length; i++) {
    let constructorArguments: readonly any[] = await getReqArgs(
      contractName,
      chainsToBeDeployedOn[i],
      data,
      [chainsToBeDeployedOn[i], seed, chainsToBeDeployedOn.length]
    );
    seed++;

    //const { abi, bytecode } = await hre.artifacts.readArtifact(contractName);

    const contractToDeployFactory = new ethers.ContractFactory(
      contractName,
      getABI(contractName)
    );

    const salt = ethers.utils.hexZeroPad(toUtf8Bytes("100"), 32);

    const abiCoder = ethers.utils.defaultAbiCoder;

    const creationCode = ethers.utils.solidityPack(
      ["bytes", "bytes"],
      [
        contractToDeployFactory.bytecode,
        abiCoder.encode(argType(), constructorArguments),
      ]
    );

    const deployedAddress = await instance.callStatic.deploy(
      creationCode,
      salt
    );

    deployedAddressArray[i] = deployedAddress;
  }

  return deployedAddressArray;
};
