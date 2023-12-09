"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runDeployer_1 = require("../src/runDeployer");
require("dotenv").config();
const tryDeployer = async () => {
    const features = {
        mintable: true,
        burnable: false,
        pausable: false,
        upradable: false,
    };
    const clientData = {
        type: "ERC20",
        tokenName: "DemoToken",
        tokenSymbol: "DMT",
        tokenDecimals: "6",
        tokenSupply: "10000000000000000000000000000",
        tokenChains: ["sepolia", "bscTestnet"],
        tokenFeatures: features,
        supportedChain: "CCIP",
    };
    const deployedAddress = await (0, runDeployer_1.runDeployer)(clientData);
    return deployedAddress;
};
if (require.main === module) {
    tryDeployer().catch((err) => {
        console.error("error in receipt gen", err);
    });
}
