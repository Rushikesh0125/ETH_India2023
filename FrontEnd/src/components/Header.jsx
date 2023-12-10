import imgUrl from "../assets/ketchuplogo.png";

const Header = () => {
  return (
    <div className="p-10 sm:p-20 lg:p-40 font-sans bg-[#efadaf]   flex flex-col md:flex-row h-max w-full items-center justify-between ">
      <div className="flex flex-col">
        <h1 className="text-8xl pb-[10px] font-exo">ketchup sdk</h1>
        <p className="text-[20px]">DIY multi-chain dApps for dummies!</p>

        {/* <a href="getstarted"> */}
        <button
          type="button"
          className="py-2.5 text-white px-5 me-2 mb-2 text-sm font-medium  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-[70px] m-[20px] ml-[0px] rounded-[30px] font-semibold text-[18px] w-max p-[12px] bg-cyan-600 uppercase"
        >
          Get Started
        </button>
      </div>

      <img src={imgUrl} className="w-[80vh] h-[80vh" />
    </div>
  );
};

export default Header;
