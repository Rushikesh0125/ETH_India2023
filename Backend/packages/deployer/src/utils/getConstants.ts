import { CONSTANTS_VALUES } from "./constant";

export const CONSTANTS = async (networkName: string) => {
  switch (networkName) {
    case "mainnet":
      return CONSTANTS_VALUES.mainnet;
    case "goerli":
      return CONSTANTS_VALUES.goerli;
    case "polygon":
      return CONSTANTS_VALUES.polygon;
    case "mumbai":
      return CONSTANTS_VALUES.mumbai;
    case "bsc":
      return CONSTANTS_VALUES.bsc;
    case "bscTestnet":
      return CONSTANTS_VALUES.bscTestnet;
    case "avalanche":
      return CONSTANTS_VALUES.avalanche;
    case "fuji":
      return CONSTANTS_VALUES.fuji;
    case "arbitrum":
      return CONSTANTS_VALUES.arbitrum;
    case "arbGoerli":
      return CONSTANTS_VALUES.arbGoerli;
    case "sepolia":
      return CONSTANTS_VALUES.sepolia;
  }
};
