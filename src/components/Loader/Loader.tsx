import React from "react";

type LoaderProps = {
  isLoading?: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
      {/* <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg> */}
      <div className="custom_loader animate-spin h-5 w-5  "></div>
    </div>
  );
};

export default Loader;
