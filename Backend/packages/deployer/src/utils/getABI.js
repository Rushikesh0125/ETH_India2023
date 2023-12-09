"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getABI = void 0;
var fs = require("node:fs");
var getABI = function (contractName) {
    var dir = contractName.includes("NFT") ? "ERC721" : "ERC20";
    var proto = contractName.charAt(contractName.length - 1) == "Z" ? "Zetachain" : "CCIP";
    var path = "../../artifacts/contracts/".concat(dir, "/").concat(proto, "/").concat(contractName, ".sol/").concat(contractName, ".json");
    var data;
    var file = JSON.parse(fs.readFileSync(path).toString());
    return file.abi;
};
exports.getABI = getABI;
console.log((0, exports.getABI)("CrossChainNFT"));
