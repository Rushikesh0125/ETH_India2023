"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDeployer = void 0;
var utils_1 = require("ethers/lib/utils");
var getReqArgs_1 = require("./utils/getReqArgs");
var getContractName_1 = require("./utils/getContractName");
var inputTypes_1 = require("./types/inputTypes");
var hardhat_1 = require("hardhat");
var Create3ABI_1 = require("./ABI/Create3ABI");
var runDeployer = function (clientData) { return __awaiter(void 0, void 0, void 0, function () {
    var protocolType, data, contractName, chainsToBeDeployedOn, deployerAddress, deployerContract, instance, argType, deployedAddressArray, seed, i, constructorArguments, contractToDeployFactory, salt, abiCoder, creationCode, deployedAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                protocolType = clientData.supportedChain == "zetachain" ? "zetachain" : "CCIP";
                data = {
                    minter: "",
                    name: clientData.tokenName,
                    symbol: clientData.tokenSymbol,
                    uri: clientData.uri,
                    supply: clientData.tokenSupply,
                    tokenFetures: clientData.tokenFeatures,
                };
                contractName = (0, getContractName_1.getContractName)(clientData.type, protocolType, data) || "";
                chainsToBeDeployedOn = clientData.tokenChains;
                deployerAddress = "0x6513Aedb4D1593BA12e50644401D976aebDc90d8";
                deployerContract = new hardhat_1.ethers.Contract(deployerAddress, Create3ABI_1.ABI);
                instance = deployerContract.attach(deployerAddress);
                argType = function () {
                    if (clientData.type == "ERC20") {
                        if (contractName.charAt(-5) == "Z") {
                            if (contractName.includes("NoRoles")) {
                                return inputTypes_1.InputTypes.inputTypeERC20ZNR;
                            }
                            else {
                                return inputTypes_1.InputTypes.inputTypeERC20Z;
                            }
                        }
                        else {
                            if (contractName.includes("NoRoles")) {
                                return inputTypes_1.InputTypes.inputTypeERC20NR;
                            }
                            else {
                                return inputTypes_1.InputTypes.inputTypeERC20;
                            }
                        }
                    }
                    else if (clientData.type == "ERC721") {
                        if (contractName.charAt(-5) == "Z") {
                            if (contractName.includes("NoRoles")) {
                                return inputTypes_1.InputTypes.inputTypeERC721ZNR;
                            }
                            else {
                                return inputTypes_1.InputTypes.inputTypeERC721Z;
                            }
                        }
                        else {
                            if (contractName.includes("NoRoles")) {
                                return inputTypes_1.InputTypes.inputTypeERC721NR;
                            }
                            else {
                                return inputTypes_1.InputTypes.inputTypeERC721;
                            }
                        }
                    }
                    var nullType = [];
                    return nullType;
                };
                deployedAddressArray = [];
                seed = 1;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < chainsToBeDeployedOn.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, getReqArgs_1.getReqArgs)(contractName, chainsToBeDeployedOn[i], data, [chainsToBeDeployedOn[i], seed, chainsToBeDeployedOn.length])];
            case 2:
                constructorArguments = _a.sent();
                seed++;
                return [4 /*yield*/, hardhat_1.ethers.getContractFactory(contractName)];
            case 3:
                contractToDeployFactory = _a.sent();
                salt = hardhat_1.ethers.utils.hexZeroPad((0, utils_1.toUtf8Bytes)("100"), 32);
                abiCoder = hardhat_1.ethers.utils.defaultAbiCoder;
                creationCode = hardhat_1.ethers.utils.solidityPack(["bytes", "bytes"], [
                    contractToDeployFactory.bytecode,
                    abiCoder.encode(argType(), constructorArguments),
                ]);
                return [4 /*yield*/, instance.callStatic.deploy(creationCode, salt)];
            case 4:
                deployedAddress = _a.sent();
                deployedAddressArray[i] = deployedAddress;
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, deployedAddressArray];
        }
    });
}); };
exports.runDeployer = runDeployer;
