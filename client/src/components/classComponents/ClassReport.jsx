import React from 'react';

function ClassReport() {
  return (
    <div className="max-w-4xl h-auto mx-auto p-8">
      <h1 className="text-3xl font-bold text-black text-center mb-6">ReportPage</h1>
      <div className="border p-6 bg-white rounded-lg">
        <div className="flex sm:flex-col lg:flex-row justify-between items-center mb-4">
          <label className="block text-lg font-medium text-black" htmlFor="studentId">
            Student ID
          </label>
          <input
            className="block w-1/4 border rounded-md py-2 px-3 text-lg text-gray-700"
            id="studentId"
            placeholder="za001"
            type="text"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-1" htmlFor="studentName">
            Student Name : Fayaz
          </label>
        </div>
        <h2 className="text-xl text-black font-semibold mb-4">Class Report</h2>

        <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 text-black gap-7 mb-6">
          <div className="flex items-center  space-x-2">
            <input id="audioDisconnected" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="audioDisconnected">
              Audio Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="videoDisconnected" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="videoDisconnected">
              Video Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="rangeIssue" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="rangeIssue">
              Range issue
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="phoneUse" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="phoneUse">
              Phone Use
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="cameraArrangement" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="cameraArrangement">
              Camera arrangement
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="notAttending" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="notAttending">
              Not attending
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="leftWOTPermission" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="leftWOTPermission">
              Left WOT permission
            </label>
          </div>
        </div>
        <h2 className="text-xl text-black font-semibold mb-4">Exam Report</h2>
        <div className="grid text-black grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-7 mb-6">
          <div className="flex items-center space-x-2">
            <input id="noParent" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="noParent">
              No Parent
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copy" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copy">
              Copy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copyDoubt" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copyDoubt">
              Copy Doubt
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="parentNotVisible" type="checkbox" className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="parentNotVisible">
              Parent Not Visible
            </label>
          </div>
        </div>
  
        <div className="mb-6">
          <label className="block text-xl font-bold text-black mb-1" htmlFor="remarks">
            Remarks
          </label>
          <textarea
            className="block w-full border rounded-md py-2 px-3 text-lg text-gray-700"
            id="remarks"
            placeholder="Type your remarks here."
          ></textarea>
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
}

export default ClassReport;
