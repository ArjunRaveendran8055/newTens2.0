import React from "react";
import { Rings, Circles, Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
const Loader = () => {
  const { loader } = useSelector((state) => state.loader);
  return (
    <div
      className={`${
        loader ? "" : "hidden "
      } h-screen w-full fixed backdrop-blur-3xl bg-white flex justify-center items-center z-50`}
    >
      <div className=" relative rounded-full flex justify-center items-center">
        <div className="backdrop:blur-md">
          <img
            src="/icons/appleLoader.gif"
            alt="appleLogo"
            className="w-48 h-48 brightness-95 contrast-200 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
