import { useContext } from "react";
import { Context } from "../context/Context";

const ERC721_details = () => {
  const {
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
    NFTSubmit,
  } = useContext(Context);

  const setFeature = (e, name) => {
    console.log(e, name);
    var prevValue = nftfeauters;
    if (name == "Burnable") {
      prevValue.Burnable = e;
      setNFTFeauters(prevValue);
    } else if (name == "Mintable") {
      prevValue.Mintable = e;
      setNFTFeauters(prevValue);
    } else if (name == "Pausable") {
      prevValue.Pausable = e;
      setNFTFeauters(prevValue);
    } else if (name == "Upgradable") {
      prevValue.Upgradable = e;
      setNFTFeauters(prevValue);
    }
  };
  const setChain = (e, name) => {
    console.log(e, name);
    var prevValue = nftChains;
    if (name == "sepolia") {
      prevValue.sepolia = e;
      setNftChains(prevValue);
    } else if (name == "mumbai") {
      prevValue.mumbai = e;
      setNftChains(prevValue);
    } else if (name == "arbgoerli") {
      prevValue.arbgoerli = e;
      setNftChains(prevValue);
    } else if (name == "bsc") {
      prevValue.bsc = e;
      setNftChains(prevValue);
    }
  };
  return (
    <div className="bg-[grey] flex flex-col gap-[20px] p-[30px]">
      <h1 className="p-[30px] py-[0px] font-semibold text-[23px]">
        Enter NFT details
      </h1>
      <div className="bg-[grey] flex gap-[20px] p-[30px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TN" className="font-semibold text-[16px]">
            Enter token name
          </label>
          <input
            type="text"
            id="TN"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            placeholder="BUDS Token"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TS" className="font-semibold text-[16px]">
            Enter token symbol
          </label>
          <input
            type="text"
            id="TS"
            value={nftSymbol}
            onChange={(e) => setNftSymbol(e.target.value)}
            placeholder="BUDS"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TTS" className="font-semibold text-[16px]">
            Enter total supply
          </label>
          <input
            type="number"
            id="TTS"
            min="0"
            value={nftSupply}
            onChange={(e) => setNftSupply(e.target.value)}
            placeholder="100000"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TS" className="font-semibold text-[16px]">
            Enter base URI
          </label>
          <input
            type="text"
            id="TS"
            value={nftBaseUri}
            onChange={(e) => setNftBaseUri(e.target.value)}
            placeholder="ipfs://.."
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
      </div>
      <div className="bg-[grey] flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Features</h1>
        <div className="bg-[grey] flex gap-[20px] font-semibold">
          <div className="check_boxm">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="1"
                onChange={(e) => setFeature(e.target.checked, "Mintable")}
              />
              <span className="mintable">Mintable</span>
            </label>
          </div>
          <div className="check_boxb">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="2"
                onChange={(e) => setFeature(e.target.checked, "Burnable")}
              />
              <span className="burnable">Burnable</span>
            </label>
          </div>
          <div className="check_boxp">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="3"
                onChange={(e) => setFeature(e.target.checked, "Pausable")}
              />
              <span className="pausable">Pausable</span>
            </label>
          </div>
          <div className="check_boxu">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="3"
                onChange={(e) => setFeature(e.target.checked, "Upgradable")}
              />
              <span className="upgradable">Upgradable</span>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-[grey] flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Select Chains</h1>
        <div className="bg-[grey] flex gap-[20px] font-semibold">
          <div className="check_boxsep">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="1"
                onChange={(e) => setChain(e.target.checked, "sepolia")}
              />
              <span className="ethsep">Ethereum sepolia</span>
            </label>
          </div>
          <div className="check_boxmum">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="2"
                onChange={(e) => setChain(e.target.checked, "mumbai")}
              />
              <span className="polmum">Polygon mumbai</span>
            </label>
          </div>
          <div className="check_boxarb">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="3"
                onChange={(e) => setChain(e.target.checked, "arbgoerli")}
              />
              <span className="arbgor">Arbitrum Goerli</span>
            </label>
          </div>
          <div className="check_boxbsc">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                value="3"
                onChange={(e) => setChain(e.target.checked, "bsc")}
              />
              <span className="bsctst">BSC testnet</span>
            </label>
          </div>
        </div>
      </div>
      {/* <div className="bg-[grey] flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Select Service</h1>
        <select
          name="chain"
          id="chain"
          className="p-[10px] outline-none font-semibold"
        >
          <option value="chainlink">Chainlink</option>
          <option value="zetachain">Zetachain</option>
          <option value="lz">Layer 0</option>
        </select>
      </div> */}
      <button
        className="w-max rounded-[10px] bg-blue-600 ml-[30px] p-[10px] font-semibold"
        onClick={NFTSubmit}
      >
        Deploy
      </button>
    </div>
  );
};

export default ERC721_details;
