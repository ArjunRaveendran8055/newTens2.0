import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";

const Attendance = () => {
  const { id } = useParams();
  const [excelData, setExceldata] = useState([]);

  console.log("excel data is :", excelData);
  return (
    <div className="bg-white mt-5 h-[88vh] rounded-lg flex flex-col">
      <div className="fileuploadContainer w-full flex sm:flex-col lg:flex-row sm:gap-5 lg:gap-10 justify-center items-center pt-10">
        <span className="font-bold text-xl">Click Here to Upload File</span>
        <FileUpload excelData={excelData} setExceldata={setExceldata} />
      </div>
      <div className="previewContainer flex flex-col w-full gap-2">
        <span className="sm:text-xl lg:text-2xl text-black">Preview</span>
        <ExcelPreview excelData={excelData} />
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

export const ExcelPreview = ({ excelData }) => {
  // Function to check the roll number format
  const isValidRoll = (roll) => {
    return /^[a-zA-Z]{2}\d{3}$/.test(roll);
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-full">
        <div className="w-full flex"></div>
        <div className="flex w-full bg-red-400">
          <div className="w-full">
            <table className="md:inline-table w-full flex flex-row sm:bg-white overflow-hidden">
              <thead className="text-black">
                <tr className="bg-[#222E3A]/[6%] flex flex-col md:table-row rounded-l-lg sm:rounded-none">
                  <th className="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                    RollNumber
                  </th>
                  <th className="py-3 px-5 text-left border border-b">
                    Duration
                  </th>
                  <th className="py-3 px-5 text-left border border-b">
                    Join Time
                  </th>
                </tr>
              </thead>
              <tbody className="flex-1 md:flex-none">
                {excelData?.map((data, index) => (
                  <tr
                    className="flex flex-col md:table-row mb-2 md:mb-0"
                    key={index}
                  >
                    <td
                      className={`border py-3 px-5 ${
                        !isValidRoll(data?.roll)
                          ? "bg-red-500 text-white"
                          : "hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent"
                      }`}
                    >
                      {data?.roll}
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5">
                      {data?.duration}
                    </td>
                    <td className="border hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5">
                      {data?.joinTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
