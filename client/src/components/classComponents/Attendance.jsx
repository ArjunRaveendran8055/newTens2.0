import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
const Attendance = () => {
  const { id } = useParams();
  const [excelData, setExceldata] = useState([]);
  console.log("excelData is:", excelData);
  return (
    <div className="bg-white mt-5 h-[88vh] rounded-lg flex flex-col">
      <div className="fileuploadContainer w-full flex sm:flex-col lg:flex-row sm:gap-5 lg:gap-10 justify-center items-center pt-10">
        <span className="font-bold text-xl">Click Here to Upload File</span>
        <FileUpload excelData={excelData} setExceldata={setExceldata} />
      </div>
      <div className="previewContainer flex w-full">
        <ExcelPreview excelData={excelData} setExcelData={setExceldata} />
      </div>
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
          console.log("headers:", headers);
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

          const jsonData = json.slice(1).map((row) => {
            let obj = {};
            row.forEach((cell, index) => {
              obj[headers[index]] = cell;
            });
            return obj;
          });
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

// Function to check the roll number format
const isValidRoll = (roll) => {
  return /^[a-zA-Z]{2}\d{3}$/.test(roll);
};

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
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentRoll, setCurrentRoll] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleEditClick = (roll, index) => {
    setCurrentRoll(roll);
    setCurrentIndex(index);
    setPopupOpen(true);
  };

  const handleSave = (newRoll) => {
    if (isValidRoll(newRoll)) {
      const newData = [...excelData];
      newData[currentIndex].roll = newRoll;
      setExcelData(newData);
      setPopupOpen(false);
    } else {
      alert("Invalid roll number format.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="w-full  px-2 ">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">Preview</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className=" w-full flex">
            <table className="md:inline-table w-full flex flex-row sm:bg-white  overflow-hidden ">
              <thead className="text-black">
                {excelData?.map((data, index) => (
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
                {excelData?.map((data, index) => (
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

                          {!isValidRoll(data?.roll) && (
                            <span
                              className=" text-red-500 text-xl"
                              onClick={() => handleEditClick(data.roll, index)}
                            >
                              <FiEdit />
                            </span>
                          )}
                        </span>
                      </span>
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.duration}
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.joinTime}
                    </td>
                    <td className=" border hover:bg-[#222E3A]/[6%] flex sm:justify-end lg:justify-start  hover:sm:bg-transparent py-3 px-5">
                      <span className=""> <MdOutlineDeleteOutline className="text-red-500 text-2xl"/></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
