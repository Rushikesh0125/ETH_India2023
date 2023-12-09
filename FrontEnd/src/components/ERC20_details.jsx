import { useReducer } from "react";
import Button from "./Button";
import { ERC20 } from "../utils";

const initialFormState = {
  tokenName: "",
  tokenSymbol: "",
  tokenSupply: "",
  tokenDecimals: "",
  tokenFeatures: {
    mintable: false,
    burnable: false,
    pausable: false,
    upgradable: false,
  },
  tokenChains: [],
  supportedChain: "",
  uri: "",

  // zetachain, chainlink ccip, bsc testnet
};
// tokenChains: {
//   sepolia: false,
//   mumbai: false,
//   arbgoerli: false,
//   bsc: false,
// },
const ERC20_details = (props) => {
  const type = props.type;

  const [formdetails, setFormDetails] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { ...initialFormState, type }
  );

  const handleFormChange = (e) => {
    if (e.target.type === "checkbox") {
      const obj = e.target.name.split(".");
      const key = obj[0];
      const value = obj[1];

      if (Array.isArray(formdetails[key])) {
        return setFormDetails({
          [key]: formdetails[key].includes(value)
            ? formdetails[key].filter((item) => item !== value)
            : [...formdetails[key], value],
        });
      } else {
        return setFormDetails({
          [key]: { ...formdetails[key], [value]: e.target.checked },
        });
      }
    }
    if (e.target.type === "select-one") {
      setFormDetails({
        supportedChain: e.target.value,
        tokenChains: formdetails.tokenChains.filter((i) => {
          if (e.target.value === "zetachain") {
            return i !== "sepolia";
          } else if (e.target.value === "chainlink ccip") {
            return i !== "goerli";
          } else return i;
        }),
      });
    } else {
      setFormDetails({ [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(type);
    if (type === ERC20) {
      console.log("yes");
      delete formdetails.uri;
      console.log("no", formdetails);
    } else {
      delete formdetails.tokenDecimals;
    }
    console.log(formdetails);
  };

  if (!type) return null;
  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-300 flex flex-col gap-[20px] p-[30px]"
    >
      <h1 className="p-[30px] py-[0px] font-semibold text-[23px]">
        Enter Token details
      </h1>
      <div className=" flex gap-[20px] p-[30px] flex-wrap">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tokenName" className="font-semibold text-[16px]">
            Enter token name
          </label>
          <input
            name="tokenName"
            value={formdetails.tokenName}
            onChange={handleFormChange}
            type="text"
            id="tokenName"
            placeholder="BUDS Token"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tokenSymbol" className="font-semibold text-[16px]">
            Enter token symbol
          </label>
          <input
            name="tokenSymbol"
            value={formdetails.tokenSymbol}
            onChange={handleFormChange}
            type="text"
            id="tokenSymbol"
            placeholder="BUDS"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tokenSupply" className="font-semibold text-[16px]">
            Enter total supply
          </label>
          <input
            name="tokenSupply"
            value={formdetails.tokenSupply}
            onChange={handleFormChange}
            type="number"
            id="tokenSupply"
            min="0"
            placeholder="100000"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        {type === ERC20 ? (
          <div className="flex flex-col gap-[10px]">
            <label
               
              className="font-semibold text-[16px]"
            >
              Enter token decimals
            </label>
            <input
              name="tokenDecimals"
              value={formdetails.tokenDecimals}
              onChange={handleFormChange}
              type="number"
              id="tokenDecimals"
              min="1"
              placeholder="18"
              className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold text-[16px]">Enter base URI</label>
            <input
              type="text"
              id="nftBaseUri"
              name="uri"
              value={formdetails.uri}
              onChange={handleFormChange}
              placeholder="ipfs://.."
              className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
            />
          </div>
        )}
      </div>
      <div className=" flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Features</h1>
        <div className="flex gap-[20px] font-semibold">
          <div className="check_boxm">
            <label>
              <input
                type="checkbox"
                // className="checkbox"
                name="tokenFeatures.mintable"
                value={formdetails.tokenFeatures.mintable}
                onChange={handleFormChange}
              />
              <span className="mintable">Mintable</span>
            </label>
          </div>
          <div className="check_boxb">
            <label>
              <input
                type="checkbox"
                // className="checkbox"
                name="tokenFeatures.burnable"
                value={formdetails.tokenFeatures.burnable}
                onChange={handleFormChange}
              />
              <span className="burnable">Burnable</span>
            </label>
          </div>
          <div className="check_boxp">
            <label>
              <input
                disabled
                type="checkbox"
                name="tokenFeatures.pausable"
                value={formdetails.tokenFeatures.pausable}
                onChange={handleFormChange}
              />
              <span className="pausable">Pausable</span>
            </label>
          </div>
          <div className="check_boxu">
            <label>
              <input
                disabled
                type="checkbox"
                // className="checkbox"
                name="tokenFeatures.upgradable"
                value={formdetails.tokenFeatures.upgradable}
                onChange={handleFormChange}
              />
              <span className="upgradable">Upgradable</span>
            </label>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">
          Supported chains
        </h1>
        <div className="flex gap-[20px] font-semibold">
          {/* <label htmlFor="select-chains">Choose a chain:</label> */}

          <select
            className="px-4 py-2 rounded-lg"
            name="supportedChain"
            id="select-chains"
            onChange={handleFormChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="zetachain">zetachain</option>
            <option value="chainlink ccip">chainlink ccip</option>
            {/* <option value="hamster">bsc testnet</option> */}
          </select>
          {/* <div className="check_boxm">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="tokenfeauters.Mintable"
                value={formdetails.tokenfeauters.Mintable}
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
                name="tokenfeauters.Burnable"
                value={formdetails.tokenfeauters.Burnable}
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
                name="tokenfeauters.Pausable"
                value={formdetails.tokenfeauters.Pausable}
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
                name="tokenfeauters.Upgradable"
                value={formdetails.tokenfeauters.Upgradable}
                onChange={handleFormChange}
              />
              <span className="upgradable">Upgradable</span>
            </label>
          </div> */}
        </div>
      </div>

      <div className="  flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Select Chains</h1>
        <div className=" flex gap-[20px] font-semibold">
          {formdetails.supportedChain === "zetachain" ? (
            <div className="check_boxsep">
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="tokenChains.goerli"
                  value={formdetails.tokenChains.sepolia}
                  onChange={handleFormChange}
                />
                <span className="ethsep">Ethereum Goerli</span>
              </label>
            </div>
          ) : (
            <div className="check_boxsep">
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="tokenChains.sepolia"
                  value={formdetails.tokenChains.sepolia}
                  onChange={handleFormChange}
                />
                <span className="ethsep">Ethereum sepolia</span>
              </label>
            </div>
          )}

          <div className="check_boxmum">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="tokenChains.mumbai"
                value={formdetails.tokenChains.mumbai}
                onChange={handleFormChange}
              />
              <span className="polmum">Polygon mumbai</span>
            </label>
          </div>
          {/* <div className="check_boxarb">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="tokenChains.arbgoerli"
                value={formdetails.tokenChains.arbgoerli}
                onChange={handleFormChange}
              />
              <span className="arbgor">Arbitrum Goerli</span>
            </label>
          </div> */}
          <div className="check_boxbsc">
            <label>
              <input
                type="checkbox"
                className="checkbox"
                name="tokenChains.bscTestnet"
                value={formdetails.tokenChains.bsc}
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
      <Button type="submit">Deploy</Button>
    </form>
  );
};

export default ERC20_details;
