import React from 'react'

function ClassHome() {
  return (
<div className="min-h-screen bg-gray-100 p-8 sm:p-2">
    
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        
        <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold text-gray-800 mr-4">Chemistry - Jithin</h1>
          <span className="text-sm text-gray-500">arjun</span>
        </div>
    
      </div>



      <div className="flex lg:flex-row sm:flex-col gap-6">
        <div className="bg-white rounded-lg p-6 lg:w-[60%] sm:w-[100%]">
            <h2 className="text-lg font-semibold mb-4">Class 8</h2>
          <p className="text-4xl font-bold text-gray-800 mb-2">62</p>
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-right text-l text-black-500 mb-4">December, 12</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#ffd940] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold">Report</h3>
              <p className="text-sm text-black-500">Total reports: 05</p>
            </div>
            <div className="bg-[#90a5f8] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold">Attendance</h3>
              <p className="text-sm text-white">Status: uploaded</p>
            </div>
            <div className="bg-[#BFDBFE] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold">Absenties</h3>
              <p className="text-sm text-black-500">Status: Updated</p>
            </div>
            <div className="bg-[#FED7AA] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold">Daily Report</h3>
              <p className="text-sm text-black-500">Status: Not updated</p>
            </div>
            <div className="bg-[#ffbe74] rounded-lg p-4 col-span-2 cursor-pointer">
              <h3 className="text-lg font-semibold">View Daily Report</h3>
              <p className="text-sm text-black-500">Status: Uploaded</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 w-[40%] lg:w-[40%] sm:w-[100%]">
          <h2 className="text-lg font-semibold mb-4">Reports</h2>
        </div>
      </div>
    </div> 

  )
}


function SearchIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }

export default ClassHome