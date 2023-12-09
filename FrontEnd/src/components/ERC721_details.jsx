import { useReducer } from "react";

const initialFormState = {
  nftName: "",
  nftSymbol: "",
  nftSupply: "",
  nftBaseUri: "",
  nftfeauters: {
    Mintable: false,
    Burnable: false,
    Pausable: false,
    Upgradable: false,
  },
  nftChains: {
    sepolia: false,
    mumbai: false,
    arbgoerli: false,
    bsc: false,
  },
};

const ERC721_details = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formdetails);
  };

  const [formdetails, setFormDetails] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialFormState
  );

  const handleFormChange = (e) => {
    if (e.target.type === "checkbox") {
      const obj = e.target.name.split(".");
      const key = obj[0];
      const value = obj[1];

      return setFormDetails({
        [key]: { ...formdetails[key], [value]: e.target.checked },
      });
    }

    setFormDetails({ [e.target.name]: e.target.value });
  };

  // const {
  //   nftName,
  //   setNftName,
  //   nftSymbol,
  //   setNftSymbol,
  //   nftSupply,
  //   setNftSupply,
  //   nftBaseUri,
  //   setNftBaseUri,
  //   // nftfeauters,
  //   // setNFTFeauters,
  //   // nftChains,
  //   // setNftChains,
  //   NFTSubmit,
  // } = useContext(Context);

  // const setFeature = (e, name) => {
  //   console.log(e, name);
  //   var prevValue = nftfeauters;
  //   if (name == "Burnable") {
  //     prevValue.Burnable = e;
  //     setNFTFeauters(prevValue);
  //   } else if (name == "Mintable") {
  //     prevValue.Mintable = e;
  //     setNFTFeauters(prevValue);
  //   } else if (name == "Pausable") {
  //     prevValue.Pausable = e;
  //     setNFTFeauters(prevValue);
  //   } else if (name == "Upgradable") {
  //     prevValue.Upgradable = e;
  //     setNFTFeauters(prevValue);
  //   }
  // };
  // const setChain = (e, name) => {
  //   console.log(e, name);
  //   var prevValue = nftChains;
  //   if (name == "sepolia") {
  //     prevValue.sepolia = e;
  //     setNftChains(prevValue);
  //   } else if (name == "mumbai") {
  //     prevValue.mumbai = e;
  //     setNftChains(prevValue);
  //   } else if (name == "arbgoerli") {
  //     prevValue.arbgoerli = e;
  //     setNftChains(prevValue);
  //   } else if (name == "bsc") {
  //     prevValue.bsc = e;
  //     setNftChains(prevValue);
  //   }
  // };
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[grey] flex flex-col gap-[20px] p-[30px]"
    >
      <h1 className="p-[30px] py-[0px] font-semibold text-[23px]">
        Enter NFT details
      </h1>
      <div className="bg-[grey] flex gap-[20px] p-[30px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nftName" className="font-semibold text-[16px]">
            Enter token name
          </label>
          <input
          id="nftName"
            type="text"
            // id="TN"
            name="nftName"
            value={formdetails.nftName}
            onChange={handleFormChange}
            placeholder="BUDS Token"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nftSymbol" className="font-semibold text-[16px]">
            Enter token symbol
          </label>
          <input
            type="text"
            id="nftSymbol"
            name="nftSymbol"
            value={formdetails.nftSymbol}
            onChange={handleFormChange}
            placeholder="BUDS"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nftSupply" className="font-semibold text-[16px]">
            Enter total supply
          </label>
          <input
            type="number"
            // id="TTS"
            id="nftSupply"
            min="0"
            name="nftSupply"
            value={formdetails.nftSupply}
            onChange={handleFormChange}
            placeholder="100000"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="nftBaseUri" className="font-semibold text-[16px]">
            Enter base URI
          </label>
          <input
            type="text"
            id="nftBaseUri"
            name="nftBaseUri"
            value={formdetails.nftBaseUri}
            onChange={handleFormChange}
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
                name="nftfeauters.Mintable"
                value={formdetails.nftfeauters.Mintable}
                onChange={handleFormChange}
              />
              <span className="mintable">Mintable</span>
            </label>
          </div>
          <div className="check_boxb">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftfeauters.Burnable"
                value={formdetails.nftfeauters.Burnable}
                onChange={handleFormChange}
              />
              <span className="burnable">Burnable</span>
            </label>
          </div>
          <div className="check_boxp">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftfeauters.Pausable"
                value={formdetails.nftfeauters.Pausable}
                onChange={handleFormChange}
              />
              <span className="pausable">Pausable</span>
            </label>
          </div>
          <div className="check_boxu">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftfeauters.Upgradable"
                value={formdetails.nftfeauters.Upgradable}
                onChange={handleFormChange}
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
                name="nftChains.sepolia"
                value={formdetails.nftChains.sepolia}
                onChange={handleFormChange}
              />
              <span className="ethsep">Ethereum sepolia</span>
            </label>
          </div>
          <div className="check_boxmum">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftChains.mumbai"
                value={formdetails.nftChains.mumbai}
                onChange={handleFormChange}
              />
              <span className="polmum">Polygon mumbai</span>
            </label>
          </div>
          <div className="check_boxarb">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftChains.arbgoerli"
                value={formdetails.nftChains.arbgoerli}
                onChange={handleFormChange}
              />
              <span className="arbgor">Arbitrum Goerli</span>
            </label>
          </div>
          <div className="check_boxbsc">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="nftChains.bsc"
                value={formdetails.nftChains.bsc}
                onChange={handleFormChange}
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
        type="submit"
        className="w-max rounded-[10px] bg-blue-600 ml-[30px] p-[10px] font-semibold"
      >
        Deploy
      </button>
    </form>
  );
};

export default ERC721_details;
