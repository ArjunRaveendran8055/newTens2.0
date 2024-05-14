import React, { useEffect, useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
const ApproveStudents = () => {
  const studentList = [
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
    {
      roll: "me043",
      name: "manu",
    },
    {
      roll: "za022",
      name: "ananthakrishnan",
    },
  ];
  const dispatch = useDispatch();
  const [allCentre, setAllCentre] = useState([]);
  const [selectedIndex,setSelectedIndex]=useState(null)
  useEffect(() => {
    dispatch(setLoader());
    axios
      .get("/centre/getAllCentres")
      .then((res) => {
        setAllCentre(res.data.result);
        dispatch(removeLoader());
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(removeLoader());
      });
  }, []);

  const previewHandler = (item,index) => {
    console.log("index",index)
    setSelectedIndex(index)
  };

  return (
    <div>
      <div className="sm:hidden lg:flex w-full h-[88vh] pt-3 px-2 gap-2">
        <div className="leftcontainer w-[40%] bg-white rounded-lg flex flex-col h-full pt-4  px-2">
          <div className="sortcontainer flex justify-end  items-center mb-2">
            <span>Centre&nbsp;</span>
            <div>
              <Select>
                <Option value="">All</Option>
                {allCentre?.map((item) => (
                  <Option className="uppercase" value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <Divider />
          <div className="flex flex-row w-full p-2 text-black">
            <div className="w-[20%]">ROLL</div>
            <div className="w-[90%]">NAME</div>
          </div>
          <div className="studentlistcontainer flex flex-col gap-2 w-full overflow-y-scroll">
            {studentList.map((item, index) => (
              <div
                className={` ${selectedIndex === index && 'bg-black text-white'}bg-whitesmoke flex cursor-pointer flex-row w-full font-Playfiar text-xl text-gray-700 rounded-md uppercase p-2`}
                onClick={()=>previewHandler(item,index)}
              >
                <div className="w-[20%]">{item.roll}</div>
                <div className="w-[90%]">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="vrtline w-[1px] h-full bg-black" />
        <div className="previewcontainer w-[60%] bg-white rounded-lg  flex h-full pt-4 px-2">
          <div className="previewtitlecontainer flex h-10 w-full justify-center items-center">
            <span className="text-2xl">
              <h2>Preview</h2>
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <div className="lg:hidden flex h-[75vh] justify-center items-center">
        <div className="">Not optimized for mobile screen</div>
      </div>
    </div>
  );
};

export default ApproveStudents;
