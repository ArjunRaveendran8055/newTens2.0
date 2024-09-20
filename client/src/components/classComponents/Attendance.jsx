import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Attendance = () => {
  const { id } = useParams();
  return (
    <div className="bg-white mt-5 h-[88vh] rounded-lg flex flex-col">
      <div className="fileuploadContainer w-full flex sm:flex-col lg:flex-row sm:gap-5 lg:gap-10 justify-center items-center pt-10">
        <span className="font-bold text-xl">Click Here to Upload File</span>
        <FileUpload />
      </div>
      <div className="previewContainer bg-blue-gray-400 flex w-full">
        <ExcelPreview/>
      </div>
    </div>
  );
};

export function FileUpload() {
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

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => console.log(event.target.files)}
          multiple
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
export const ExcelPreview = () => {
  return (
    <div className=" bg-green-200 flex  items-center justify-center">
      <div className="">
        <div className="w-full  px-2 max-w-[453px] mx-auto">
          <h1 className="text-xl sm:text-2xl font-medium mb-2">
            Tailwind Mobile Responsive Table
          </h1>
        </div>
        <div class="flex items-center justify-center">
          <div class="">
            <table class="sm:inline-table w-full flex flex-row sm:bg-white  overflow-hidden ">
              <thead class="text-black">
                {products?.map((data, index) => (
                  <tr
                    class={`bg-[#222E3A]/[6%] flex flex-col sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0 ${
                      index == 0 ? "sm:flex" : "sm:hidden"
                    }`}
                    key={index}
                  >
                    <th class="py-3 px-5 text-left border border-b rounded-tl-lg sm:rounded-none">
                      ID
                    </th>
                    <th class="py-3 px-5 text-left border border-b">
                      Category
                    </th>
                    <th class="py-3 px-5 text-left border border-b">Company</th>
                    <th class="py-3 px-5 text-left border border-t rounded-bl-lg sm:rounded-none">
                      Price
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody class="flex-1 sm:flex-none">
                {products?.map((data, index) => (
                  <tr
                    class="flex flex-col sm:table-row mb-2 sm:mb-0"
                    key={index}
                  >
                    <td class="border hover:bg-[#222E3A]/[6%] hover:sm:bg-transparent py-3 px-5">
                      {data?.id}
                    </td>
                    <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.Category}
                    </td>
                    <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5">
                      {data?.Company}
                    </td>
                    <td class="border hover:bg-[#222E3A]/[6%]  hover:sm:bg-transparent py-3 px-5 cursor-pointer">
                      {"$" + data?.Price}
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
