import { useReducer } from "react";

const initialFormState = {
  tokenName: "",
  tokenSymbol: "",
  tokenSupply: "",
  tokenDecimals: "",
  tokenfeauters: {
    Mintable: false,
    Burnable: false,
    Pausable: false,
    Upgradable: false,
  },
  tokenChains: {
    sepolia: false,
    mumbai: false,
    arbgoerli: false,
    bsc: false,
  },
};

const ERC20_details = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formdetails);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[grey] flex flex-col gap-[20px] p-[30px]"
    >
      <h1 className="p-[30px] py-[0px] font-semibold text-[23px]">
        Enter Token details
      </h1>
      <div className="bg-[grey] flex gap-[20px] p-[30px]">
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
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tokenDecimals" className="font-semibold text-[16px]">
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
      </div>
      <div className="bg-[grey] flex flex-col gap-[20px] p-[30px] pt-[0px]">
        <h1 className="font-semibold text-left text-[17px]">Features</h1>
        <div className="bg-[grey] flex gap-[20px] font-semibold">
          <div className="check_boxm">
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
                name="tokenChains.sepolia"
                value={formdetails.tokenChains.sepolia}
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
                name="tokenChains.mumbai"
                value={formdetails.tokenChains.mumbai}
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
                name="tokenChains.arbgoerli"
                value={formdetails.tokenChains.arbgoerli}
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
                name="tokenChains.bsc"
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
      <button
        type="submit"
        className="w-max rounded-[10px] bg-blue-600 ml-[30px] p-[10px] font-semibold"
      >
        Deploy
      </button>
    </form>
  );
};

export default ERC20_details;
