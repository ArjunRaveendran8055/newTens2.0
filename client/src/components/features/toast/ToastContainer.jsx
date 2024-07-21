import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToastView, setToastView } from "./toastSlice";
import { FcApproval } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

const CustToastContainer = () => {
  const { toastView, type, msg } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  // console.log("toastDatasAre: ", toastView, type, msg);

  const submitHandler = () => {
    dispatch(hideToastView());
  };
  return (
    <div
      className={`${toastView ? "" : "hidden"} 
  fixed z-50 h-[100vh] w-full 
  ${type === "error" && "backdrop-blur-sm"}  
  z-50 flex justify-center items-center
  `}
    >
      <div className="toast-container z-50 bg-white sm:px-10 md:px-12 lg:px-24 border-[1px] shadow-xl rounded-md flex flex-col items-center">
        {type === "error" ? (
          <div
            className={`flex flex-col mt-5  text-red-500 justify-center items-center`}
          >
            <span className="">
              <span className="w-10 h-10 flex justify-center items-center rounded-full bg-red-50 text-xl">
                x
              </span>
            </span>
            <span className="mt-2 text-black text-2xl font-enriq">Error</span>
          </div>
        ) : (
          <div className={`uppercase mt-[2px] font-enriq text-xs`}>
            ! {type}_MSG !
          </div>
        )}

        <div
          className={`sm:pt-3 pb-5 font-enriq sm:text-md md:text-2xl flex flex-row justify-center items-center text-gray-600`}
        >
          {msg}
        </div>
        <div className="w-full">
          <button
            className="mb-4 py-2 w-full rounded-md bg-red-600 text-white  font-semibold"
            onClick={submitHandler}
          >
            {type === "error" ? <p>OK</p> : <p>DONE</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustToastContainer;
