import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import {
  Button
} from "@material-tailwind/react";
import axios from 'axios';

function AllStudentsView() {

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMedium, setMedium] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [students, setStudents] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPagee, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [selectedLimit, setSelectedLimit] = useState(5);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleLimitChange = (e) => {
    setSelectedLimit(Number(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/student/getAllStudentsDetailed', {
        syllabus: selectedSyllabus,
        classs: selectedClass,
        country: selectedCountry,
        district: selectedDistrict,
        medium: selectedMedium,
        page: currentPagee,
        limit: selectedLimit
      });

      // Extract data from response
      const { students, currentPage, totalPages, totalDocuments } = response.data;
      setStudents(students);

      // Debugging statements to ensure state update
      console.log('Setting current page to:', currentPage);
      setCurrentPage(currentPage);

      setTotalPages(totalPages);
      setTotalDocuments(totalDocuments);

      // Dynamically set columns based on the student data
      if (students.length > 0) {
        setColumns(Object.keys(students[0]));
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      setError('Failed to fetch students');
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [currentPagee, selectedLimit]);


  const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasargod"
  ];
  const classes = ["7", "8", "9", "10", "11", "12"];
  const syllabi = ["cbse", "state"];
  const country = ["india", "usa", "quatar"];

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const handleDownload = async () => {

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const today = new Date();

    try {
      const response = await axios({
        url: '/student/downloadStudentsExcel', // Replace with your server URL
        method: 'POST',
        responseType: 'blob', // Ensure the response is treated as binary data
        data: {
          syllabus: selectedSyllabus, // Replace with actual filtering criteria
          classs: selectedClass,
          country: selectedCountry,
          district: selectedDistrict,
          medium: selectedMedium,
        },
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Download Progress: ${percentCompleted}%`);
        },
      });

      // Create a temporary link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `students_${formatDate(today)}_.csv`); // Specify the file name
      link.click();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };


  return (
    <section className="container mx-auto pt-6 font-mono">
      <div className='flex gap-5'>
        <Button
          className="flex mb-4 sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-10 lg:h-10 text-white"
          onClick={handleDownload}
        >
          <span>Export</span>
        </Button>

        <Button
          className="flex mb-2 sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-10 lg:h-10 text-white"
          onClick={toggleOverlay}
        >
          <span>Sort Data</span>
        </Button>

        {/* Limit Selection Dropdown */}
        <select
          value={selectedLimit}
          onChange={handleLimitChange}
          className="bg-white border h-10 border-gray-300 rounded-md shadow-sm py-2 px-3"
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>

      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap bg-gray shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-900 text-white">
              <tr className="text-md sm:text-sm font-semibold whitespace-nowrap tracking-wide text-left uppercase border-b border-gray-200">
                {columns.map((column, index) => (
                  <th key={index} align="center" className="px-4 py-3">
                    {column.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr className="hover:bg-gray-100" key={index}>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      align="center"
                      className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black"
                    >
                      {column === 'student_status' ? (
                        student.student_status ? (
                          <span className="px-2 py-1 text-sm font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-sm font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                            Inactive
                          </span>
                        )
                      ) : Array.isArray(student[column]) ? (
                        student[column].join(', ')
                      ) : (
                        student[column] || 'N/A'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-3 items-center">
        <button
          onClick={() => handlePageChange(currentPagee - 1)}
          disabled={currentPagee === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Previous
        </button>
        <span>Page {currentPagee} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPagee + 1)}
          disabled={currentPagee === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Sliding Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${isOverlayOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <button
          className="absolute top-4 right-4 text-black"
          onClick={toggleOverlay}
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sort Data</h2>

          {/* Syllabus Dropdown */}
          <div className="mb-4">
            <label htmlFor="syllabus" className="block text-sm font-medium text-gray-700">
              Syllabus
            </label>
            <select
              id="syllabus"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedSyllabus}
              onChange={(e) => setSelectedSyllabus(e.target.value)}
            >
              <option value="">Select Syllabus</option>
              {syllabi.map((syllabus, index) => (
                <option key={index} value={syllabus}>
                  {syllabus.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Class Dropdown */}
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              id="class"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Medium Dropdown */}
          <div className="mb-4">
            <label htmlFor="medium" className="block text-sm font-medium text-gray-700">
              Medium
            </label>
            <select
              id="medium"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedMedium}
              onChange={(e) => setMedium(e.target.value)}
            >
              <option value="english">
                English
              </option>
              <option value="malayalam">
                Malayalam
              </option>

            </select>
          </div>

          {/* Country Dropdown */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {country.map((country, index) => (
                <option key={index} value={country}>
                  {country.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>


          {/* Submit Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      </div>
    </section>
  )
}

export default AllStudentsView