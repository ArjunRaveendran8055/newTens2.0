import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function ClassReport() {
  const { id } = useParams();
  const { user } = useSelector(state => state.user);

    // STATE FOR STORE ROLL NUMBER TO SEARCH
    const [searchRoll, setSearchRoll]=useState("")
    // STATE FOR STORE STUDENT NAME
    const [studentName,setStudentName]=useState("")
    const [studentId,setStudentId]=useState("")
    // STATE FOR STORE STUDENT DATA FROM CHECKBOXES
    const [reportData, setReportData] = useState({
      roll: "",
      name: "",
      studentId: "",
      report: [], 
      remark: "",
      reportedBy: "",
      followUp: false,
  });

      // STATE FOR SAVE BUTTON ENABLE/DISABLE
      const [isDataFetched, setIsDataFetched] = useState(false);


   useEffect(()=>{
        fetchData()
   },[searchRoll])



       
   // FUNCTION TO GET STUDENT NAME FROM ROLL NUMBER
   const fetchData = async () => {
    if (searchRoll.length === 5) {
        try {
            const response = await axios.get(`http://localhost:8055/student/getAllStudents?roll=${searchRoll}`);
            const fetchedStudentName = response.data.data[0].student_name;
            console.log(response.data.data[0]._id)
            setStudentId(response.data.data[0]._id)
            setStudentName(fetchedStudentName);
            setReportData(prevState => ({
                ...prevState,
                name: fetchedStudentName,
                roll: searchRoll,
                reportedBy:user.firstname,
            }));
            setIsDataFetched(true); // Enable the save button
        } catch (error) {
            console.log(error.response);
            setIsDataFetched(false); // Disable the save button
        }
    } else {
        setStudentName("");
        setReportData({
          roll: "",
          name: "",
          studentId: "",
          report: [], 
          remark: "",
          reportedBy: "",
          followUp: false,
        })
        setIsDataFetched(false); // Disable the save button
    }
};

    const handleCheckboxChange = (e) => {
      console.log(reportData)
      const { id, checked } = e.target;
      let updatedReport = [...reportData.report];

      if (checked) {
          updatedReport.push(id);
      } else {
          updatedReport = updatedReport.filter(item => item !== id);
      }

      setReportData(prevState => ({
          ...prevState,
          report: updatedReport
      }));
  };

  const handleFollowUpChange = (e) => {
    const { checked } = e.target;

    setReportData(prevState => ({
        ...prevState,
        followUp: checked
    }));
};


  const handleRemarkChange = (e) => {
    const { value } = e.target;

    setReportData(prevState => ({
        ...prevState,
        remark: value
    }));
};



// POST REQUEST TO SERVER
   const handleSave = async() => {
    console.log(reportData)
   await axios.post(`http://localhost:8055/classReport/CreateReport/${id}`,{
    ...reportData,
    studentId,
  })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>console.log(err))
};

    
    

  return (
    <div className="max-w-4xl min-h-screen h-auto mx-auto p-8">
      <h1 className="text-3xl font-bold text-black text-center mb-6">ReportPage</h1>
      <div className="border p-6 bg-white rounded-lg">
        <div className="flex sm:flex-col lg:flex-row justify-between items-center mb-4">
          <label className="block text-lg font-medium text-black" htmlFor="studentId">
            Student ID
          </label>
          <input
            className="block w-1/4 border rounded-md py-2 px-3 text-lg text-gray-700"
            id="studentId"
            placeholder="Enter Roll NO"
            type="text"
            onChange={(e)=>setSearchRoll(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-1" htmlFor="studentName">
            Student Name : {studentName}
          </label>
        </div>
        {isDataFetched && (
      <div> 
        <h2 className="text-xl text-black font-semibold mb-4">Class Report</h2>

        <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 text-black gap-7 mb-6">
          <div className="flex items-center  space-x-2">
            <input id="audioDisconnected" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="audioDisconnected">
              Audio Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="videoDisconnected" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="videoDisconnected">
              Video Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="rangeIssue" type="checkbox" onChange={handleCheckboxChange}  className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="rangeIssue">
              Range issue
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="phoneUse" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="phoneUse">
              Phone Use
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="cameraArrangement" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="cameraArrangement">
              Camera arrangement
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="notAttending" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="notAttending">
              Not attending
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="leftWOTPermission" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="leftWOTPermission">
              Left WOT permission
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="followUp" type="checkbox"  checked={reportData.followUp} onChange={handleFollowUpChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="followUp">
              Follow up
            </label>
          </div>
        </div>
        <h2 className="text-xl text-black font-semibold mb-4">Exam Report</h2>
        <div className="grid text-black grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-7 mb-6">
          <div className="flex items-center space-x-2">
            <input id="noParent" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="noParent">
              No Parent
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copy" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copy">
              Copy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copyDoubt" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copyDoubt">
              Copy Doubt
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="parentNotVisible" type="checkbox" onChange={handleCheckboxChange} className="rounded border-gray-300" />
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
            onChange={handleRemarkChange}
          ></textarea>
        </div>
        
            <button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Save
           </button>
               
      </div> 
      )}
      </div> 
    </div>
  );
}

export default ClassReport;