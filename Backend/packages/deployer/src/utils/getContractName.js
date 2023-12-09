"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractName = void 0;
var getContractName = function (Type, protocol, clientData) {
    if (Type == "ERC20") {
        if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
            if (protocol == "zetachain") {
                return "CrossChainTokenZ.sol";
            }
            else {
                return "CrossChainToken.sol";
            }
        }
        else if (clientData.tokenFetures.burnable) {
            if (protocol == "zetachain") {
                return "CrossChainTokenBurnableZ.sol";
            }
            else {
                return "CrossChainTokenBurnable.sol";
            }
        }
        else if (clientData.tokenFetures.mintable) {
            if (protocol == "zetachain") {
                return "CrossChainTokenMintableZ.sol";
            }
            else {
                return "CrossChainTokenMintable.sol";
            }
        }
    }
    else if (Type == "ERC721") {
        if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
            if (protocol == "zetachain") {
                return "CrossChainNFTZ.sol";
            }
            else {
                return "CrossChainNFT.sol";
            }
        }
        else if (clientData.tokenFetures.burnable) {
            if (protocol == "zetachain") {
                return "CrossChainNFTBurnableZ.sol";
            }
            else {
                return "CrossChainNFTBurnable.sol";
            }
        }
        else if (clientData.tokenFetures.mintable) {
            if (protocol == "zetachain") {
                return "CrossChainNFTMintableZ.sol";
            }
            else {
                return "CrossChainNFTMintable.sol";
            }
        }
    }
};
exports.getContractName = getContractName;
