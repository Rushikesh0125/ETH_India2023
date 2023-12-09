const Header = () => {
  return (
    <div className="p-[150px] font-sans bg-green-300 flex-col flex h-max w-full">
      <h1 className="text-[50px] pb-[10px]">SNB SDK</h1>
      <p className="text-[18px]">The one step sdk for your multichain game!</p>
      <a
        href="#getstarted"
        className="mt-[70px] m-[20px] ml-[0px] rounded-[30px] font-semibold text-[18px] w-max p-[12px] bg-cyan-600"
      >
        Get Started
      </a>
    </div>
  );
};

export default Header;
