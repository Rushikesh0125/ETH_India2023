const Header = () => {
  return (
    <div className="p-[150px] font-sans bg-green-300 flex-col flex h-max w-full">
      <h1 className="text-[50px] pb-[10px]">SNB SDK</h1>
      <p className="text-[18px]">The one step sdk for your multichain game!</p>

      <a href="getstarted">
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-[70px] m-[20px] ml-[0px] rounded-[30px] font-semibold text-[18px] w-max p-[12px] bg-cyan-600"
        >
          Get Started
        </button>
      </a>

      {/* <a
        href="#getstarted"
        className="mt-[70px] m-[20px] ml-[0px] rounded-[30px] font-semibold text-[18px] w-max p-[12px] bg-cyan-600"
      >
        Get Started
      </a> */}
    </div>
  );
};

export default Header;
