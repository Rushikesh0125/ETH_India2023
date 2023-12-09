"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTANTS = void 0;
const constant_1 = require("./constant");
const CONSTANTS = async (networkName) => {
    switch (networkName) {
        case "mainnet":
            return constant_1.CONSTANTS_VALUES.mainnet;
        case "goerli":
            return constant_1.CONSTANTS_VALUES.goerli;
        case "polygon":
            return constant_1.CONSTANTS_VALUES.polygon;
        case "mumbai":
            return constant_1.CONSTANTS_VALUES.mumbai;
        case "bsc":
            return constant_1.CONSTANTS_VALUES.bsc;
        case "bscTestnet":
            return constant_1.CONSTANTS_VALUES.bscTestnet;
        case "avalanche":
            return constant_1.CONSTANTS_VALUES.avalanche;
        case "fuji":
            return constant_1.CONSTANTS_VALUES.fuji;
        case "arbitrum":
            return constant_1.CONSTANTS_VALUES.arbitrum;
        case "arbGoerli":
            return constant_1.CONSTANTS_VALUES.arbGoerli;
        case "sepolia":
            return constant_1.CONSTANTS_VALUES.sepolia;
    }
};
exports.CONSTANTS = CONSTANTS;
