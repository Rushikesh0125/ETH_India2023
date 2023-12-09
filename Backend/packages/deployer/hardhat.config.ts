import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import contractSizer from "hardhat-contract-sizer";
import { task } from "hardhat/config";
import "dotenv/config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  networks: {
    mumbai: {
      url: process.env.MUMBAI_URL,
      chainId: 80001,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    arbGoerli: {
      url: process.env.ARBGOERLI_URL,
      chainId: 421613,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    fuji: {
      url: process.env.FUJI_URL,
      chainId: 43113,
      accounts: [`0x${process.env.PRIVATE_KEY || " "}`],
    },
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYSCAN_API_KEY || "",
      bscTestnet: process.env.BSC_TESTNET_API_KEY || "",
      arbitrumGoerli: process.env.ARBGOERLI_TESTNET_API_KEY || "",
      avalancheFujiTestnet: process.env.FUJI_TESTNET_API_KEY || "",
    },
  },
};

task(
  "account",
  "returns nonce and balance for specified address on multiple networks"
)
  .addParam("address")
  .setAction(async (address) => {
    const web3Goerli = createAlchemyWeb3(process.env.SEPOLIA_URL || "");
    const web3Mumbai = createAlchemyWeb3(process.env.MUMBAI_URL || "");
    const web3bsc = createAlchemyWeb3(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );
    const web3arb = createAlchemyWeb3(process.env.ARBGOERLI_URL || "");

    const networkIDArr = ["sepolia:", "mumbai:", "bscTestnet", "arbGoerli"];
    const providerArr = [web3Goerli, web3Mumbai, web3bsc, web3arb];
    const resultArr = [];

    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(
        address.address,
        "latest"
      );
      const balance = await providerArr[i].eth.getBalance(address.address);
      resultArr.push([
        networkIDArr[i],
        nonce,
        parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) +
          "ETH",
      ]);
    }
    resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "]);
    console.log(resultArr);
  });

export default config;
