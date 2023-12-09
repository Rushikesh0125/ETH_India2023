const inputTypeERC721Z: readonly string[] = [
  "address",
  "address",
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721ZNR: readonly string[] = [
  "address",
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC721NR: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
  "string",
  "uint256",
  "uint256",
  "uint256",
  "uint256",
];

const inputTypeERC20: readonly string[] = [
  "address",
  "address",
  "string",
  "string",
];
const inputTypeERC20NR: readonly string[] = ["address", "string", "string"];
const inputTypeERC20Z: readonly string[] = [
  "address",
  "address",
  "address",
  "address",
  "string",
  "string",
];
const inputTypeERC20ZNR: readonly string[] = [
  "address",
  "address",
  "address",
  "string",
  "string",
];

export const InputTypes = {
  inputTypeERC20,
  inputTypeERC20NR,
  inputTypeERC20Z,
  inputTypeERC20ZNR,
  inputTypeERC721,
  inputTypeERC721NR,
  inputTypeERC721Z,
  inputTypeERC721ZNR,
};
