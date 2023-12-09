/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Context = createContext();

const State = ({ children }) => {
  // NFT DETAILS
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [nftSupply, setNftSupply] = useState(0);
  const [nftBaseUri, setNftBaseUri] = useState("");
  const [nftfeauters, setNFTFeauters] = useState({
    Brunable: false,
    Mintable: false,
    Pausable: false,
    Upgradable: false,
  });
  const [nftChains, setNftChains] = useState({
    sepolia: false,
    mumbai: false,
    arbgoerli: false,
    bsc: false,
  });

  // TOKEN DETAILS
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState(0);
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [tokenfeauters, setTokenFeauters] = useState({
    Burnable: false,
    Mintable: false,
    Pausable: false,
    Upgradable: false,
  });
  const [tokenChains, setTokenChains] = useState({
    sepolia: false,
    mumbai: false,
    goerli: false,
    bsc: false,
  });

  // CARDS DETAILS
  // const ERC20_DETAILS = "ERC20";
  // const ERC721_DETAILS = "ERC721";
  // const ERC20_CARD = "TOKEN_CARD";
  // const ERC721_CARD = "NFT_CARD";
  const [contract_details_open, setContract_details_open] = useState("");

  function open_erc_20() {
    // document.getElementById(ERC721_DETAILS).display = "none";
    // document.getElementById(ERC20_DETAILS).display = "block";
    // document.getElementById(ERC721_CARD).classList.add("bg-grey");
    // document.getElementById(ERC721_CARD).classList.remove("bg-rose-600");
    // document.getElementById(ERC20_CARD).classList.add("bg-rose-600");
    setContract_details_open("ERC20");
  }

  function open_erc_721() {
    // document.getElementById(ERC20_DETAILS).display = "none";
    // document.getElementById(ERC721_DETAILS).display = "block";
    // document.getElementById(ERC721_CARD).classList.add("bg-rose-600");
    // document.getElementById(ERC20_CARD).classList.remove("bg-rose-600");
    // document.getElementById(ERC20_CARD).classList.add("bg-grey");
    setContract_details_open("ERC721");
  }

  function NFTSubmit() {
    console.log(
      nftName,
      nftSymbol,
      nftSupply,
      nftBaseUri,
      nftfeauters,
      nftChains
    );
  }

  function ERC20Submit(){
    console.log(
      tokenName,
      tokenSymbol,
      tokenSupply,
      tokenDecimals,
      tokenfeauters,
      tokenChains
    );
  }

  return (
    <Context.Provider
      value={{
        open_erc_20,
        open_erc_721,
        contract_details_open,
        nftName,
        setNftName,
        nftSymbol,
        setNftSymbol,
        nftSupply,
        setNftSupply,
        nftBaseUri,
        setNftBaseUri,
        nftfeauters,
        setNFTFeauters,
        nftChains,
        setNftChains,
        tokenName,
        setTokenName,
        tokenSymbol,
        setTokenSymbol,
        tokenSupply,
        setTokenSupply,
        tokenDecimals,
        setTokenDecimals,
        tokenfeauters,
        setTokenFeauters,
        tokenChains,
        setTokenChains,
        NFTSubmit,
        ERC20Submit
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default State;
