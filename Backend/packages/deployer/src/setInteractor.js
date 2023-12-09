"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const getABI_1 = require("./utils/getABI");
const getProviderURL_1 = require("./utils/getProviderURL");
const setInteractor = async (contractName, contractAddresses, chains) => {
    const data = (0, getABI_1.getABI)(contractName);
    for (let i = 0; i < chains.length; i++) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider((0, getProviderURL_1.getProviderURLs)(chains[i]));
        const wallet = new ethers_1.Wallet(process.env.PRIVATE_KEY || "", provider);
        const contractInst = new ethers_1.ethers.Contract(contractAddresses[i], data.abi, wallet);
        for (let j = 0; j < chains.length; j++) {
            if (i == j)
                continue;
            const tx1 = await contractInst.setInteractorByChainId(chains[j] == "goerli" ? 5 : chains[j] == "mumbai" ? 80001 : 97, true);
            tx1.wait();
        }
    }
};
