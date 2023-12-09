import { UserArgsType } from "../types/userArgsType";

export const getContractName = (
  Type: string,
  protocol: string,
  clientData: UserArgsType
) => {
  if (Type == "ERC20") {
    if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenZ";
      } else {
        return "CrossChainToken";
      }
    } else if (clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenBurnableZ";
      } else {
        return "CrossChainTokenBurnable";
      }
    } else if (clientData.tokenFetures.mintable) {
      if (protocol == "zetachain") {
        return "CrossChainTokenMintableZ";
      } else {
        return "CrossChainTokenMintable";
      }
    }
  } else if (Type == "ERC721") {
    if (clientData.tokenFetures.mintable && clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTZ";
      } else {
        return "CrossChainNFT";
      }
    } else if (clientData.tokenFetures.burnable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTBurnableZ";
      } else {
        return "CrossChainNFTBurnable";
      }
    } else if (clientData.tokenFetures.mintable) {
      if (protocol == "zetachain") {
        return "CrossChainNFTMintableZ";
      } else {
        return "CrossChainNFTMintable";
      }
    }
  }
};
