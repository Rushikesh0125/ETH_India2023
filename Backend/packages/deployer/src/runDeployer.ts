import { Signer } from "ethers";
import { deployContract } from "./deployContract";
import { getContractArgs } from "./utils/getContractArgs";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ParamType, toUtf8Bytes } from "ethers/lib/utils";

type featureType = {
  mintable: boolean;
  burnable: boolean;
  pausable: boolean;
  upradable: boolean;
};

type userArgsType = {
  minter?: string;
  name: string;
  symbol: string;
  uri?: string;
  supply?: string;
  chainId?: string;
  seed?: string;
  tokenFetures: featureType;
};

const inputTypeERC721Z: readonly string[] = [
  "address",
  "address",
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721ZNR: readonly string[] = [
  "address",
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721NR: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC20: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
];
const inputTypeERC20NR: readonly string[] = ["address", "string", "string"];
const inputTypeERC20Z: readonly string[] = [
  "address",
  "address",
  "address",
  "address",
  "string",
  "string",
];
const inputTypeERC20ZNR: readonly string[] = [
  "address",
  "address",
  "address",
  "string",
  "string",
];

type formData = {
  type: string;
  tokenName: string;
  tokenSymbol: string;
  tokenSupply: string;
  tokenDecimals: string;
  tokenFeatures: featureType;
  tokenChains: string[]; // Assuming tokenChains is an array of strings, you can adjust this based on the actual type.
  supportedChain: string;
  uri?: string;
};

export const runDeployer = async (
  clientData: formData,
  hre: HardhatRuntimeEnvironment,
  signer: Signer
) => {
  const protocolType =
    clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";

  const data: userArgsType = {
    minter: "",
    name: clientData.tokenName,
    symbol: clientData.tokenSymbol,
    uri: "",
    supply: clientData.tokenSupply,
    chainId: clientData.uri,
    tokenFetures: clientData.tokenFeatures,
  };

  const contractName =
    getContractName(clientData.type, protocolType, data) || "";

  const chainsToBeDeployedOn = clientData.tokenChains;

  const deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
  const { abi, bytecode } = await hre.artifacts.readArtifact("Create3Deployer");
  const deployerAbi = abi;
  const deployerBytecode = bytecode;

  const deployerContract = new hre.ethers.Contract(
    deployerAddress,
    deployerAbi,
    signer
  );

  const argType = () => {
    if (clientData.type == "ERC20") {
      if (contractName.charAt(-5) == "Z") {
        if (contractName.includes("NoRoles")) {
          return inputTypeERC20ZNR;
        } else {
          return inputTypeERC20Z;
        }
      } else {
        if (contractName.includes("NoRoles")) {
          return inputTypeERC20NR;
        } else {
          return inputTypeERC20;
        }
      }
    } else if (clientData.type == "ERC721") {
      if (contractName.charAt(-5) == "Z") {
        if (contractName.includes("NoRoles")) {
          return inputTypeERC721ZNR;
        } else {
          return inputTypeERC721Z;
        }
      } else {
        if (contractName.includes("NoRoles")) {
          return inputTypeERC721NR;
        } else {
          return inputTypeERC721;
        }
      }
    }
    const nullType: ParamType[] = [];
    return nullType;
  };

  let deployedAddressArray = [];

  for (let i = 0; i < chainsToBeDeployedOn.length; i++) {
    const constructorArguments: readonly any[] = await getReqArgs(
      contractName,
      chainsToBeDeployedOn[i],
      data
    );

    const { abi, bytecode } = await hre.artifacts.readArtifact(contractName);

    const salt = hre.ethers.utils.hexZeroPad(toUtf8Bytes("100"), 32);

    const abiCoder = hre.ethers.utils.defaultAbiCoder;

    const creationCode = hre.ethers.utils.solidityPack(
      ["bytes", "bytes"],
      [bytecode, abiCoder.encode(argType(), constructorArguments)]
    );

    const deployedAddress = await deployerContract.callStatic.deploy(
      creationCode,
      salt
    );

    deployedAddressArray[i] = deployedAddress;
  }

  return deployedAddressArray;
};

const getReqArgs = async (
  contractName: string,
  netWork: string,
  userArgs: userArgsType
) => {
  const intialArgs: any[] = await getContractArgs(contractName, netWork);
  let args: readonly any[] = [];
  if (contractName.includes("NFT")) {
    if (contractName.includes("NoRoles")) {
      args = [
        ...intialArgs,
        userArgs.name,
        userArgs.symbol,
        userArgs.uri,
        userArgs.supply,
        userArgs.chainId,
        userArgs.seed,
        3,
      ];
    } else {
      args = [
        ...intialArgs,
        userArgs.minter,
        userArgs.name,
        userArgs.symbol,
        userArgs.uri,
        userArgs.supply,
        userArgs.chainId,
        userArgs.seed,
        3,
      ];
    }
  } else if (contractName.includes("Token")) {
    if (contractName.includes("NoRoles")) {
      args = [...intialArgs, userArgs.minter, userArgs.name, userArgs.symbol];
    } else {
      args = [...intialArgs, userArgs.name, userArgs.symbol];
    }
  }
  return args;
};

const getContractName = (
  Type: string,
  protocol: string,
  clientData: userArgsType
) => {
  if (Type == "ERC20") {
    if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenZ.sol";
      } else {
        return "CrossChainToken.sol";
      }
    } else if (clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenBurnableZ.sol";
      } else {
        return "CrossChainTokenBurnable.sol";
      }
    } else if (clientData.tokenFetures.mintable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenMintableZ.sol";
      } else {
        return "CrossChainTokenMintable.sol";
      }
    }
  } else if (Type == "ERC721") {
    if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTZ.sol";
      } else {
        return "CrossChainNFT.sol";
      }
    } else if (clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTBurnableZ.sol";
      } else {
        return "CrossChainNFTBurnable.sol";
      }
    } else if (clientData.tokenFetures.mintable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTMintableZ.sol";
      } else {
        return "CrossChainNFTMintable.sol";
      }
    }
  }
};
