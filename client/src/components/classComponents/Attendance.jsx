import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import { FiEdit } from "react-icons/fi";

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

const products = [
  {
    id: 1,
    Category: "Electronics",
    Company: "Apple",
    Product: "iPhone 13",
    Description: "The latest iPhone with advanced features",
    Price: 999,
  },
  {
    id: 2,
    Category: "Clothing",
    Company: "Nike",
    Product: "Running Shoes",
    Description: "High-quality running shoes for athletes",
    Price: 89,
  },
  {
    id: 3,
    Category: "Books",
    Company: "Penguin Books",
    Product: "The Great Gatsby",
    Description: "Classic novel by F. Scott Fitzgerald",
    Price: 12,
  },
  {
    id: 4,
    Category: "Home Appliances",
    Company: "Samsung",
    Product: "Smart Refrigerator",
    Description: "Refrigerator with smart features and spacious design",
    Price: 14,
  },
];
export const ExcelPreview = ({ excelData }) => {
  // Function to check the roll number format
  const isValidRoll = (roll) => {
    return /^[a-zA-Z]{2}\d{3}$/.test(roll);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="w-full  px-2 ">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">Preview</h1>
        </div>
        <div class="flex items-center justify-center">
          <div class=" w-full flex">
            <table class="md:inline-table w-full flex flex-row sm:bg-white  overflow-hidden ">
              <thead class="text-black">
                {excelData?.map((data, index) => (
                  <tr
                    class={`bg-[#222E3A]/[6%] flex flex-col md:table-row rounded-l-lg sm:rounded-none mb-2 md:mb-0 ${
                      index == 0 ? "md:flex" : "md:hidden"
                    }`}
                    key={index}
                  >
                    <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                      Roll Number
                    </th>
                    <th class="py-3 px-5 text-left border border-b">
                      Duration
                    </th>
                    <th class="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">
                      JoinTime
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody class="flex-1 md:flex-none">
                {excelData?.map((data, index) => (
                  <tr
                    class="flex flex-col md:table-row mb-2 md:mb-0"
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
                            <span className=" text-red-500 text-xl">
                              <FiEdit />
                            </span>
                          )}
                        </span>
                      </span>
                    </td>
                    <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.duration}
                    </td>
                    <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
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
