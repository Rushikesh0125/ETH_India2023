/* eslint-disable */

import clsx from "clsx";

const common =
  "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";

const Button = ({ className, children, ...rest }) => {
    console.log("cl", className)
  //  eslint-disable-next-line react/prop-types
  const classNames = clsx(common, className || "");

  return (
    <button type="button" className={classNames} {...rest}>
      {/* eslint-disable-next-line react/prop-types */}
      {children}
    </button>
  );
};

export default Button;
