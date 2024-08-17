import React, { useState } from 'react'
import * as XLSX from "xlsx";
import { SERVER_URL } from '../../server';
import axios from 'axios';

function BulkUpload() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState(null);

 const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel")
    ) {
      setUploadedFile(file);
      setError(null); // Clear any previous error
      setUploadSuccess(false); // Reset the success message when a new file is selected
    } else {
      setUploadedFile(null);
      setUploadSuccess(false);
      setError("Please upload a valid Excel file."); // Set the error message
    }
  };

  const handleUploadClick = async () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet);
  
          // Sending the JSON data to the backend
          const response = await axios.post(SERVER_URL+'/leadBank/bulkUploadLead', { leads: json });
  
          if (response.status === 200) {
            setUploadSuccess(true);
            console.log('Upload successful:', response.data);
  
            // Clear the file input and reset state
            setUploadedFile(null); // Assuming you have a state for the uploaded file
            setJsonData([]); // Clear the JSON data state
            document.getElementById('file-upload').value = ''; // Reset file input field
            setTimeout(() => {
              setUploadSuccess(false);
            }, 3000);
          } else {
            setError("Error uploading data");
            console.log('Upload failed:', response.data);
          }
        } catch (error) {
          setError("An error occurred while processing the file.");
          console.error("Error reading file or uploading data:", error);
        }
      };
      reader.readAsArrayBuffer(uploadedFile);
    } else {
      setError("Please select an Excel file to upload."); // Set the error message
    }
  };

  const handleDownloadClick = () => {
    // The URL of the sample Excel file on the server
    const fileUrl = SERVER_URL+"/public/leadsample.xlsx"; // Replace with your actual file URL

    // Create a link element, set the download attribute with the file URL, and click it
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "sample.xlsx"; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link element
  };
      
  return (
    <div className="relative flex items-center justify-center lg:mt-20 sm:mt-5 bg-gray-50">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bulk Upload</h1>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Upload Excel Files</h2>
        <p className="text-sm text-gray-500">
          Drag and drop your Excel files here or click to select.
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex h-64 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-center text-gray-400 cursor-pointer"
        >
          <p className="text-sm">
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
        <button
          onClick={handleDownloadClick}
          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Download Sample
        </button>
      </div>
      {uploadSuccess && (
        <div className="text-center">
          <p className="text-sm font-medium text-green-500">File uploaded successfully!</p>
        </div>
      )}
    </div>

    {/* Error Notification */}
    {error && (
      <div className="absolute top-4 right-4 p-4 bg-red-500 text-white rounded-md shadow-md">
        <p>{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 text-sm underline"
        >
          Dismiss
        </button>
      </div>
    )}
  </div>
  )
}

export default BulkUpload