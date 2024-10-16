import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
const Attendance = () => {
  const [excelData, setExceldata] = useState([]);
  //console.log("excelData is:", excelData);
  return (
    <div className="bg-white mt-5 h-[88vh] rounded-lg flex flex-col">
      <div className="fileuploadContainer w-full flex sm:flex-col lg:flex-row sm:gap-5 lg:gap-10 justify-center items-center pt-10">
        <span className="font-bold text-xl">Click Here to Upload File</span>
        <FileUpload excelData={excelData} setExceldata={setExceldata} />
      </div>
      {excelData.length > 0 && (
        <div className="previewContainer flex w-full">
          <ExcelPreview excelData={excelData} setExcelData={setExceldata} />
        </div>
      )}
    </div>
  );
};

export function FileUpload({ setExceldata }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (json.length > 0) {
          const headers = json[0];
          //console.log("headers:", headers);
          const expectedHeaders = [
            "studentName",
            "roll",
            "duration",
            "joinTime",
          ];
          const isValid =
            headers.length === expectedHeaders.length &&
            headers.every((header, index) => header === expectedHeaders[index]);

          if (!isValid) {
            window.alert(
              "Error: Excel file must only contain the headings 'roll', 'duration', and 'joinTime'."
            );
            return;
          }

          const jsonData = json
            .slice(1)
            .map((row) => {
              let obj = {};
              row.forEach((cell, index) => {
                obj[headers[index]] = cell;
              });
              return obj;
            })
            .filter(
              (obj) =>
                Object.keys(obj).length > 0 && !obj.hasOwnProperty(undefined)
            );
          setExceldata(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept=".xlsx, .xls"
        />
      </Button>
    </>
  );
}

// Popup component for editing roll numbers
const EditRollPopup = ({
  isOpen,
  onClose,
  currentRoll,
  setCurrentRoll,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[350px]">
        <h2 className="text-lg mb-4">Edit Roll Number</h2>
        <input
          type="text"
          value={currentRoll}
          onChange={(e) => setCurrentRoll(e.target.value)}
          className="border-2 border-gray-200 p-2 w-full"
        />
        <div className="flex justify-end gap-5 mt-4">
          <button
            onClick={() => onSave(currentRoll)}
            className="bg-blue-500 text-white p-2 w-20 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 w-20 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const ExcelPreview = ({ excelData, setExcelData }) => {
  const { id } = useParams();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [ogExcelData, setOgExcelData] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentRoll, setCurrentRoll] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [lessTime, setLessTime] = useState(null);
  const handleEditClick = (roll, index) => {
    setCurrentRoll(roll);
    setCurrentIndex(index);
    setPopupOpen(true);
  };
  useEffect(() => {
    axios
      .get(`/class/getOneClass/${id}`)
      .then((res) => {
        console.log("response is", res.data.classdate);
        setStudents(res.data.students);
        const datePart = res.data.classdate.split("T")[0];
        console.log(datePart);

        const timeCorrectData = excelData.map((item) => {
          let [hour, minute, second] = item.joinTime.split(/:|\s/);
          hour =
            parseInt(hour) +
            (item.joinTime.includes("PM") && hour !== "12" ? 12 : 0);
          hour = hour.toString().padStart(2, "0"); // Ensure two-digit hour
          return {
            ...item,
            joinTime: `${datePart}T${hour}:${minute}:${second}000+00:00`,
          };
        });
        setOgExcelData([...timeCorrectData]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //console.log("ogExcel data is",ogExcelData)
  //console.log("trialexcel",excelData)
  const deleteRowHandler = (index) => {
    setOgExcelData(() => ogExcelData.filter((item, ind) => ind !== index));
  };

  const lessTimeChangeHander = (e) => {
    const time = e.target.value;
    if (Number(time) > 30) {
      setLessTime(time);
    } else {
      setLessTime(null);
    }
  };

  //console.log("lesstime is:", lessTime);
  const handleSave = (newRoll) => {
    if (isValidRoll(newRoll)) {
      const newData = [...ogExcelData];
      newData[currentIndex].roll = newRoll;
      setOgExcelData(newData);
      setPopupOpen(false);
    } else {
      alert("Roll number DoesNot Exist!.");
    }
  };

  function convertTimestampToTime(timestamp) {
    const correctedTimestamp = timestamp.replace("000+", "00+"); // Fix milliseconds issue
    const date = new Date(correctedTimestamp);

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime =
      [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":") +
      " " +
      ampm;

    return formattedTime;
  }

  // Function to check the roll number format
  const isValidRoll = (roll) => {
    return students.some((stud) => stud.roll_no === roll);
  };

  // Function to find duplicates by roll number
  const findDuplicates = (arr) => {
    const seen = new Set();
    const duplicates = new Set();
    arr.forEach((item) => {
      if (seen.has(item.roll)) {
        duplicates.add(item.roll);
      }
      seen.add(item.roll);
    });
    return duplicates;
  };

  const duplicateRolls = findDuplicates(ogExcelData);

  //console.log("dupilcates:",duplicateRolls)

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="w-full  px-2 ">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">Preview</h1>
        </div>
        <div className="w-full px-2 flex justify-end items-center gap-2 pb-2">
          <label className="font-bold" htmlFor="lesstime">
            Less Time :
          </label>
          <input
            name="lesstime"
            onChange={lessTimeChangeHander}
            type="number"
            className="border border-black outline-none rounded sm:w-16 h-10 p-2 text-center"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className=" w-full flex flex-col">
            <table className="md:inline-table w-full flex flex-row sm:bg-white  overflow-hidden ">
              <thead className="text-black">
                {ogExcelData?.map((data, index) => (
                  <tr
                    className={`bg-[#222E3A]/[6%] flex flex-col md:table-row rounded-l-lg sm:rounded-none mb-2 md:mb-0 ${
                      index == 0 ? "md:flex" : "md:hidden"
                    }`}
                    key={index}
                  >
                    <th className="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                      Roll Number
                    </th>
                    <th className="py-3 px-5 text-left border border-b">
                      Duration
                    </th>
                    <th className="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">
                      JoinTime
                    </th>
                    <th className="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">
                      Actions
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody className="flex-1 md:flex-none">
                {ogExcelData?.map((data, index) => (
                  <tr
                    className="flex flex-col md:table-row mb-2  md:mb-0"
                    key={index}
                  >
                    <td
                      className={`border py-3 px-5 ${
                        !isValidRoll(data?.roll)
                          ? ""
                          : "hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent"
                      }`}
                    >
                      <span className="relative flex-row justify-between">
                        <span className="flex flex-row justify-between">
                          <span className="">{data?.roll}</span>

                          <span className="flex gap-2">
                            {duplicateRolls.has(data.roll) && (
                              <span className=" text-red-500 text-xl">
                                <CiWarning />
                              </span>
                            )}

                            {duplicateRolls.has(data.roll) && (
                              <span
                                className=" text-red-500 text-xl"
                                onClick={() =>
                                  handleEditClick(data.roll, index)
                                }
                              >
                                <FiEdit />
                              </span>
                            )}

                            {!isValidRoll(data?.roll) && (
                              <span
                                className=" text-red-500 text-xl"
                                onClick={() =>
                                  handleEditClick(data.roll, index)
                                }
                              >
                                <FiEdit />
                              </span>
                            )}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      <span
                        className={`${
                          data.duration < lessTime
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {data.duration}
                      </span>
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {convertTimestampToTime(data?.joinTime)}
                    </td>
                    <td className=" border hover:bg-[#222E3A]/[6%] flex sm:justify-end lg:justify-start  hover:sm:bg-transparent py-3 px-5">
                      <span
                        className=""
                        onClick={() => deleteRowHandler(index)}
                      >
                        <MdOutlineDeleteOutline className="text-red-500 text-2xl" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full px-2 flex justify-center items-center gap-2 pt-5">
              <button className="cursor-pointer w-44 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all group ">
                <span className="">Save Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditRollPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        currentRoll={currentRoll}
        setCurrentRoll={setCurrentRoll}
        onSave={handleSave}
      />
    </div>
  );
};

export default Attendance;
