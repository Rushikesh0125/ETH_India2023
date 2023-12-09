"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviderURLs = void 0;
require("dotenv").config();
const getProviderURLs = (networkName) => {
    switch (networkName) {
        case "mainnet":
            return process.env.MAINNET;
        case "goerli":
            return process.env.GOERLI_URL;
        case "polygon":
            return process.env.POLYGON;
        case "mumbai":
            return process.env.MUMBAI_URL;
        case "bsc":
            return process.env.BSC;
        case "bscTestnet":
            return process.env.BSCTESTNET_URL;
        case "avalanche":
            return process.env.AVALANCH;
        case "fuji":
            return process.env.FUJI_URL;
        case "arbitrum":
            return process.env.ARBITRUM;
        case "arbGoerli":
            return process.env.ARBGOERLI_URL;
        case "sepolia":
            return process.env.SEPOLIA_URL;
    }
};
exports.getProviderURLs = getProviderURLs;
