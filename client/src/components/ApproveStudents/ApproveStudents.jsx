import React, { useEffect } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import axios from "axios";
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
  useEffect(() => {
    axios
      .get("/centre/getAllCentres")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
      <div className="sm:hidden lg:flex w-full h-[88vh] pt-3 px-2 gap-2">
        <div className="leftcontainer w-[40%] bg-white rounded-lg flex flex-col h-full pt-4  px-2">
          <div className="sortcontainer flex justify-end  items-center mb-2">
            <span>Centre&nbsp;</span>
            <div>
              <Select>
                <Option>Male</Option>
                <Option>Female</Option>
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
              <div className="flex flex-row w-full bg-whitesmoke font-Playfiar text-xl text-gray-700 rounded-md uppercase p-2">
                <div className="w-[20%]">{item.roll}</div>
                <div className="w-[90%]">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="vrtline w-[1px] h-full bg-black"></div>
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
