import React, { useState } from 'react'

function BulkUpload() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
          setUploadedFile(file);
          setUploadSuccess(false); // Reset the success message when a new file is selected
        } else {
          alert("Please upload an Excel file.");
          setUploadedFile(null);
          setUploadSuccess(false);
        }
      };

      const handleUploadClick = () => {
        if (uploadedFile) {
          // Simulate an upload process
          setTimeout(() => {
            setUploadSuccess(true);
          }, 1000); // Simulate a delay for upload
        } else {
          alert("Please select an Excel file to upload.");
        }
      };

      
  return (
<div className="flex items-center justify-center mt-20 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Upload Excel File</h2>
          <p className="text-sm text-gray-500">
            Drag and drop your Excel files here or click to select.
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="flex h-64 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-center text-gray-400 cursor-pointer"
          >
            <p className="text-sm text-black">
              {uploadedFile ? uploadedFile.name : "Drag and drop your Excel files here or click to select files"}
            </p>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <label
            htmlFor="file-upload"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Select Files
          </label>
          <button
            onClick={handleUploadClick}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
        {uploadSuccess && (
          <div className="text-center">
            <p className="text-sm font-medium text-green-500">File uploaded successfully!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BulkUpload