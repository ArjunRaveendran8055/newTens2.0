import React, { useState } from 'react'
import { FaTimes } from "react-icons/fa";

function AllStudentsView() {

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

    const users =[
        {
          "roll_no": "ME001",
          "student_name": "AASHITHA JOY",
          "gender": "FEMALE",
          "address": "KACHAPPILLY (H) PALAYAMPARAMBU",
          "class": "10TH",
          "syllabus": "STATE",
          "student_status": true,
          "medium": "ENGLISH",
          "school_name": "ST.JOSEPH ALOOR",
          "school_location": "ALOOR",
          "district": "THRISSUR",
          "pin_code": "",
          "mother_name": "",
          "father_name": "JOY K G",
          "father_contact_no": "7737604277",
          "mother_contact_no": "9547434162",
          "centre_name": "MALA",
          "whatsapp_contact_no": "9747434162"
        },
        {
          "roll_no": "ME002",
          "student_name": "ANJALI DAS",
          "gender": "FEMALE",
          "address": "PARAMBATH (H) VADAKKANCHERY",
          "class": "10TH",
          "syllabus": "CBSE",
          "student_status": true,
          "medium": "MALAYALAM",
          "school_name": "GOVT HSS",
          "school_location": "VADAKKANCHERY",
          "district": "PALAKKAD",
          "pin_code": "678001",
          "mother_name": "",
          "father_name": "RAJESH DAS",
          "father_contact_no": "8947623104",
          "mother_contact_no": "9446823410",
          "centre_name": "PALAKKAD",
          "whatsapp_contact_no": "8947623104"
        },
        {
          "roll_no": "ME003",
          "student_name": "ARYAN RAJAN",
          "gender": "MALE",
          "address": "NIRAPPEL (H) KANJIRAPPALLY",
          "class": "12TH",
          "syllabus": "STATE",
          "student_status": false,
          "medium": "ENGLISH",
          "school_name": "ST.MARY'S HSS",
          "school_location": "KANJIRAPPALLY",
          "district": "KOTTAYAM",
          "pin_code": "686512",
          "mother_name": "",
          "father_name": "RAJAN K",
          "father_contact_no": "8876543210",
          "mother_contact_no": "9123456789",
          "centre_name": "KOTTAYAM",
          "whatsapp_contact_no": "9123456789"
        },
        {
          "roll_no": "ME004",
          "student_name": "MAYA SURESH",
          "gender": "FEMALE",
          "address": "SREEMOOLAM (H) KUNNAMKULAM",
          "class": "11TH",
          "syllabus": "ICSE",
          "student_status": true,
          "medium": "ENGLISH",
          "school_name": "NIRMALA PUBLIC SCHOOL",
          "school_location": "KUNNAMKULAM",
          "district": "THRISSUR",
          "pin_code": "680503",
          "mother_name": "",
          "father_name": "SURESH M",
          "father_contact_no": "9898654321",
          "mother_contact_no": "9765432109",
          "centre_name": "THRISSUR",
          "whatsapp_contact_no": "9898654321"
        },
        {
          "roll_no": "ME005",
          "student_name": "RAHUL MENON",
          "gender": "MALE",
          "address": "MENON (H) KASARGOD",
          "class": "12TH",
          "syllabus": "CBSE",
          "student_status": true,
          "medium": "ENGLISH",
          "school_name": "KENDRIYA VIDYALAYA",
          "school_location": "KASARGOD",
          "district": "KASARGOD",
          "pin_code": "671121",
          "mother_name": "Suni",
          "father_name": "MENON P",
          "father_contact_no": "9876543210",
          "mother_contact_no": "9654321098",
          "centre_name": "KASARGOD",
          "whatsapp_contact_no": "9876543210"
        }
      ]
      

      const districts = [...new Set(users.map(user => user.district))];
      const classes = [...new Set(users.map(user => user.class))];
      const syllabi = [...new Set(users.map(user => user.syllabus))];
      const country = ["INDIA","USA","QATAR"]

      const columns = Object.keys(users[0]);

  return (
    <section className="container mx-auto pt-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-h-[600px] whitespace-no-wrap bg-gray shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-900 to-gray-900 text-white">
              <tr className="text-md sm:text-sm font-semibold whitespace-nowrap tracking-wide text-left uppercase border-b border-gray-200">
                {columns.map((column, index) => (
                  <th key={index} align="center" className="px-4 py-3">
                    {column.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr className="hover:bg-gray-100" key={index}>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      align="center"
                      className="px-4 py-3 border-t border-gray-200 text-m sm:text-sm text-black"
                    >
                      {column === "student_status" ? (
                        user.student_status ? (
                          <span className="px-2 py-1 text-sm font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-sm font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                            Inactive
                          </span>
                        )
                      ) : Array.isArray(user[column]) ? (
                        user[column].join(", ")
                      ) : (
                        user[column] || "N/A"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Button */}
      <button
        className="fixed bottom-4 left-70 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
        onClick={toggleOverlay}
      >
        Sort Data
      </button>

      {/* Sliding Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${
          isOverlayOpen ? "translate-x-0" : "translate-x-full"
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
            <label htmlFor="syllabus" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="syllabus"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              onChange={(e) => handleSort('district')}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>



        </div>
      </div>

    </section>
  )
}

export default AllStudentsView