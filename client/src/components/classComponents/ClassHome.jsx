import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";

function ClassHome() {
  const dispatch = useDispatch();

  // CLASS ID
  const { id } = useParams();

  // STATE'S
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState([]);
  const [reportCount, setReportCount] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [openDetailedReport, setOpenDetailedReport] = useState(false);

  // function to fetch class details
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8055/class/getoneclass/${id}`
      );
      const responseReports = await axios.get(
        `http://localhost:8055/classReport/GetAllReport/${id}`
      );
      const data = response.data;
      // store report data to loop for preview
      setReportData(responseReports.data.report);
      dispatch(removeLoader());
      // STORE REPORT COUNT TO SHOW ON FRONTEND
      setReportCount(responseReports.data.report.length);
      // STORE CLASS DATA
      setClassData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch(setLoader());
    fetchData();
  }, []);

  //dialogue box handler
  const handleOpen = (item) => {
    setOpen(!open);
    console.log(item);
    setSelectedStudent(item);
  };
  const handleClose = () => setOpen(false);

  //formatting incoming timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    // Get hours and minutes from the Date object
    const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2 digits with leading zero
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits with leading zero
    return `${hours}:${minutes}`;
  };

  console.log(openDetailedReport, "check karo");

  return (
    <div className="bg-gray-100 p-8 sm:p-2 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="flex flex-col md:flex-row md:items-center mb-4 mt-4 md:mb-0">
          <h1 className="text-2xl font-semibold text-black mr-4">
            {classData.classsubject} - {classData.tutorname}
          </h1>
        </div>
      </div>

      <div className="flex w-full relative bg-red-50 lg:flex-row h-[35rem] lg:h-[35rem] sm:h-[70rem] sm:flex-col gap-6 ">
        <div
          className={`${
            openDetailedReport && "transform duration-300 hidden w-0"
          } bg-white rounded-lg p-6 lg:w-[60%] sm:w-[100%]`}
        >
          <h2 className="text-lg font-semibold mb-4">Class 8</h2>
          <p className="text-4xl font-bold text-gray-800 mb-2">62</p>
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-right text-l text-black-500 mb-4">December, 12</p>
          <div className="grid grid-cols-2 gap-4">
            <Link to={`/classreport/${id}`}>
              <div className="bg-[#ffd940] rounded-lg h-full p-4 cursor-pointer">
                <h3 className="text-lg font-semibold text-black">Add Report</h3>
                <p className="text-l text-black-500">
                  Total reports: {reportCount}
                </p>
              </div>
            </Link>
            <div className="bg-[#90a5f8] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg text-black font-semibold">Attendance</h3>
              <p className="text-l text-white">Status: uploaded</p>
            </div>
            <div className="bg-[#BFDBFE] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold text-black">Absenties </h3>
              <p className="text-l text-black-500">Status: Updated</p>
            </div>
            <div className="bg-[#FED7AA] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold text-black">Daily Report</h3>
              <p className="text-l text-black-500">Status: Not updated</p>
            </div>
            <div
              className="bg-[#ffbe74] rounded-lg p-4 col-span-2 cursor-pointer"
              onClick={() => setOpenDetailedReport(!openDetailedReport)}
            >
              <h3 className="text-lg font-semibold text-black">
                Detailed Report View
              </h3>
              <p className="text-l text-black-500">Status: Done</p>
            </div>
          </div>
        </div>

        <Dialog open={open}>
          <DialogHeader>
            <Typography className="w-full flex" variant="h5" color="blue-gray">
              <span className="text-2xl flex font-Playfiar w-full justify-between">
                <p>Detailed Report</p>{" "}
                <span className="flex justify-center items-center">
                  <p className="text-xs">Reported Time :</p>{" "}
                  <p className=" font-thin text-gray-500">
                    {formatTimestamp(selectedStudent.time)}
                  </p>
                </span>
              </span>
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <Typography color="red" variant="h4">
              <p className="uppercase font-Playfiar">
                {selectedStudent.roll} {selectedStudent.name}
              </p>
            </Typography>
            <div className=" w-full flex flex-col">
              <span className="text-xl text-black flex font-Playfiar">
                Reported Issues
                <p className=" font-caveat text-gray-700">
                  {" "}
                  &nbsp;({selectedStudent.reportedBy})
                </p>
              </span>
              <div className="followupitemscontainer flex flex-wrap gap-2  capitalize">
                {selectedStudent.report?.map((item, key) => (
                  <div key={key}>
                    {key + 1}. {item}
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full flex flex-col">
              <h2 className="text-xl text-black">Remarks</h2>
              <div className="remark-container flex flex-wrap gap-2 capitalize">
                {selectedStudent.remark?.length === 0 ? (
                  "No Remarks Found."
                ) : (
                  <div>{selectedStudent.remark}</div>
                )}
              </div>
            </div>
            {selectedStudent.followUp ? (
              <div className=" w-full flex flex-col">
                <span className="text-xl text-black flex font-Playfiar">
                  Response{" "}
                  {selectedStudent.response?.length === 0 ? (
                    ""
                  ) : (
                    <div>({selectedStudent.response})</div>
                  )}
                </span>
                <div className="response-container flex flex-wrap gap-2">
                  {selectedStudent.response?.length === 0 ? (
                    "No Response Yet."
                  ) : (
                    <div>{selectedStudent.remark}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className=" w-full flex flex-col text-green-300 items-end">
                <p>Issue Solved By Message</p>
              </div>
            )}
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="gradient" onClick={handleClose}>
              Close
            </Button>
          </DialogFooter>
        </Dialog>

        {/* report container */}

        <div
          className={`${
            openDetailedReport &&
            "absolute  -translate-x-96 transform duration-1000  h-full  "
          } bg-white rounded-lg overflow-auto p-6  sm:w-[100%]`}
          style={{transformOrigin:"right"}}
        >
          {!openDetailedReport ? (
            <>
              <h2 className="text-xl text-black font-semibold mb-4">Reports</h2>
              {reportData.map((item, index) => {
                return (
                  <div key={index}>
                    <hr></hr>
                    <div className="flex flex-col mt-2 mb-2">
                      <div className="flex justify-between">
                        <span className="text-black text-sm mb-1 font-bold">
                          <span>
                            <p>
                              {item.roll.toUpperCase()} -{" "}
                              {item.name.toUpperCase()}
                            </p>
                          </span>
                        </span>{" "}
                        <span className="flex gap-5">
                          <p className=" text-md font-caveat">
                            {formatTimestamp(item.time)}
                          </p>
                          <LuEye
                            className="text-xl cursor-pointer"
                            onClick={() => handleOpen(item)}
                          />
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <p className=" capitalize">{item.report.join(", ")}</p>
                      </div>
                      <div className="w-full flex justify-end">
                        <p className=" font-enriq">
                          <span className=" text-xs">Reported By:</span>{" "}
                          {item.reportedBy}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </>
          ) : (
            <div></div>
          )}
        </div>

        {/* end of report container */}
      </div>
    </div>
  );
}

export default ClassHome;
