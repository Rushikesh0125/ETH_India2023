"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABI = void 0;
exports.ABI = [
    {
        inputs: [],
        name: "AlreadyDeployed",
        type: "error",
    },
    {
        inputs: [],
        name: "DeployFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "DeployInitFailed",
        type: "error",
    },
    {
        inputs: [],
        name: "EmptyBytecode",
        type: "error",
    },
    {
        inputs: [],
        name: "NativeTransferFailed",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "deployedAddress",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "bytecodeHash",
                type: "bytes32",
            },
        ],
        name: "Deployed",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "bytecode",
                type: "bytes",
            },
            {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
            },
        ],
        name: "deploy",
        outputs: [
            {
                internalType: "address",
                name: "deployedAddress_",
                type: "address",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "bytecode",
                type: "bytes",
            },
            {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "init",
                type: "bytes",
            },
        ],
        name: "deployAndInit",
        outputs: [
            {
                internalType: "address",
                name: "deployedAddress_",
                type: "address",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "bytecode",
                type: "bytes",
            },
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "salt",
                type: "bytes32",
            },
        ],
        name: "deployedAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
