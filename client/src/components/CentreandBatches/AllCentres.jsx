import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Dialog } from "@material-tailwind/react";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import { Link } from "react-router-dom";
function AllCentres() {
  const dispatch = useDispatch();
  const [allCentres, setAllCentres] = useState([]);
  const [openAddCentre, setOpenAddCentre] = useState(false);
  useEffect(() => {
    dispatch(setLoader());
    axios
      .get("/centre/getAllCentres")
      .then((res) => {
        console.log("result", res.data.result);
        setAllCentres(res.data.result);
        dispatch(removeLoader());
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(removeLoader());
      });
  }, []);

  const handleOpenAddCentre = () => {
    setOpenAddCentre((cur) => !cur);
  };
  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-center justify-between pb-6 mb-6 border-black border-b-[1px]">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
          <input
            className="bg-white dark:bg-gray-800 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search Centre..."
            type="text"
          />
        </div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={()=>setOpenAddCentre(true)}
        >
          Add Centre
        </button>
      </div>

      <Dialog
        size="md"
        open={openAddCentre}
        handler={handleOpenAddCentre}
        className="flex"
      >
        <div className="relative  add-report flex flex-col bg-white sm:w-full shadow-2xl rounded-lg items-center ">
          <div className="text-2xl font-bold text-black heading-container sm:pt-5">
            Add New Centre
          </div>
          <div className="text-custred">error message here</div>
          <div className="pt-5 flex gap-5"></div>
          <div className="rea-res-container w-full flex flex-col lg:p-5">
            <div className="reason-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reasontitle lg:w-[30%] sm:w-full  text-black text-xl font-Playfiar">
                Centre Name
              </div>
              <div className="reasoninput lg:w-[70%] sm:w-full">
                <input
                  type="text"
                  className={`p-2  w-full border-[1px] border-black rounded-sm font-bold `}
                />
              </div>
            </div>
            <div className="response-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reposetitle lg:w-[30%] sm:w-full text-black text-xl font-Playfiar">
                Tag
              </div>
              <div className="responseinput lg:w-[70%] sm:w-full">
                <input
                  type="text"
                  className={`p-2  w-full border-[1px] border-black rounded-sm font-bold `}
                />
              </div>
            </div>

            <div className="response-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reposetitle lg:w-[30%] sm:w-full text-black text-xl font-Playfiar">
                InCharge
              </div>
              <div className="responseinput lg:w-[70%] sm:w-full flex sm:flex-col lg:flex-row sm:gap-2 justify-between">
                <span className=" flex">
                  1.{" "}
                  <input
                    type="text"
                    className={`px-2 py-1 border-[1px] border-black rounded-sm sm:w-full`}
                  />
                </span>
                <span className="flex">
                  2.{" "}
                  <input
                    type="text"
                    className={`px-2 py-1 border-[1px] border-black rounded-sm sm:w-full`}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="btncontainer flex w-full items-center justify-center pb-10">
            <button className="py-2 px-4 bg-custblue text-whitesmoke hover:text-white rounded-lg hover:shadow-xl shadow-black hover:scale-105 duration-150"
            
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCentres.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
            <div className="p-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase">
                  {item.AllCentresname}
                </h3>
              </div>
              <p className="text-black mb-4 capitalize">
                Charge: {item.incharge.join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-black text-sm">Version 5.0.0</span>
                <Link key={index} to={`/batches`}>
                <Button size="sm" variant="outlined" className="rounded-full">
                  Manage
                </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default AllCentres;
