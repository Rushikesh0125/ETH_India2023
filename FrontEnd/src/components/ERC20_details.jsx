const ERC20_details = () => {
  return (
    <div className="bg-[grey] flex flex-col gap-[20px] p-[30px]">
      <h1 className="p-[30px] py-[0px] font-semibold text-[23px]">
        Enter Token details
      </h1>
      <div className="bg-[grey] flex gap-[20px] p-[30px]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TN" className="font-semibold text-[16px]">
            Enter token name
          </label>
          <input
            type="text"
            id="TN"
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
            placeholder="100000"
            className="rounded-[10px] outline-none p-[8px] text-[17px] text-semibold border-[2px] border-blue-700"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="TS" className="font-semibold text-[16px]">
            Enter token decimals
          </label>
          <input
            type="number"
            id="TS"
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
              <input type="checkbox" className="checkbox" value="1" />
              <span className="mintable">Mintable</span>
            </label>
          </div>
          <div className="check_boxb">
            <label>
              <input type="checkbox" className="checkbox" value="2" />
              <span className="burnable">Burnable</span>
            </label>
          </div>
          <div className="check_boxp">
            <label>
              <input type="checkbox" className="checkbox" value="3" />
              <span className="pausable">Pausable</span>
            </label>
          </div>
          <div className="check_boxu">
            <label>
              <input type="checkbox" className="checkbox" value="3" />
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
              <input type="checkbox" className="checkbox" value="1" />
              <span className="ethsep">Ethereum sepolia</span>
            </label>
          </div>
          <div className="check_boxmum">
            <label>
              <input type="checkbox" className="checkbox" value="2" />
              <span className="polmum">Polygon mumbai</span>
            </label>
          </div>
          <div className="check_boxarb">
            <label>
              <input type="checkbox" className="checkbox" value="3" />
              <span className="arbgor">Arbitrum Goerli</span>
            </label>
          </div>
          <div className="check_boxbsc">
            <label>
              <input type="checkbox" className="checkbox" value="3" />
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
      <button className="w-max rounded-[10px] bg-blue-600 ml-[30px] p-[10px] font-semibold">
        Deploy
      </button>
    </div>
  );
};

export default ERC20_details;
