import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import {
  Button
} from "@material-tailwind/react";
import axios from 'axios';

function AllStudentsView() {

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [students, setStudents] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/student/getAllStudentsDetailed', {
        syllabus: selectedSyllabus,
        classs: selectedClass,
        country: selectedCountry,
        district: selectedDistrict
      });

      // Extract data from response
      const { students } = response.data;
      setStudents(students);

      // Dynamically set columns based on the student data
      if (students.length > 0) {
        setColumns(Object.keys(students[0]));
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    }
  };

  useEffect(() => {
     handleSubmit();
  }, []);


  const districts = [...new Set(students.map(student => student.district))];
  const classes = [...new Set(students.map(student => student.class))];
  const syllabi = [...new Set(students.map(student => student.syllabus))];
  const country = ["INDIA", "USA", "QATAR"];


  return (
<section className="container mx-auto pt-6 font-mono">
      <div className='flex gap-5'>
        <Button
          className="flex mb-4 sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-10 lg:h-10 text-white"
        >
          <span>Export</span>
        </Button>
        <Button
          className="flex mb-2 sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-10 lg:h-10 text-white"
          onClick={toggleOverlay}
        >
          <span>Sort Data</span>
        </Button>
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
                      className="px-4 py-3 border-t border-gray-200 text-m sm:text-sm text-black"
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
                  {syllabus}
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
                  {country}
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
                  {district}
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