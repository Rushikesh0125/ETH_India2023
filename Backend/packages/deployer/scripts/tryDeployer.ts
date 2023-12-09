import { runDeployer } from "../src/runDeployer";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { FormData } from "../src/types/FormData";
import { FeatureType } from "../src/types/featureType";
import { ethers } from "ethers";
require("dotenv").config();

const tryDeployer = async () => {
  const features: FeatureType = {
    mintable: true,
    burnable: false,
    pausable: false,
    upradable: false,
  };

  const clientData: FormData = {
    type: "ERC20",
    tokenName: "newToken",
    tokenSymbol: "NT",
    tokenDecimals: "6",
    tokenSupply: "10000000000000000000000000000",
    tokenChains: ["sepolia", "bscTestnet"],
    tokenFeatures: features,
    supportedChain: "CCIP",
    minter: "0x636917b1DBFe0a21B94C499BBD91f1e144F29538",
  };

  const deployedAddress = await runDeployer(clientData);

  return deployedAddress;
};

if (require.main === module) {
  tryDeployer().catch((err) => {
    console.error("error in receipt gen", err);
  });
}
