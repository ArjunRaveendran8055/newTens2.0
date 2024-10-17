import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Switch } from "@material-tailwind/react";

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
      syllabus:"",
      class:"",
      stream:"",
      batch:"",
      centre:"",
      report: [], 
      remark: "",
      reportedBy: "",
      response:"",
      respondedBy:"",
      followUp: false,
  });
    // state to show message after submitting report
    const[saveMessage,setSaveMessage]=useState("")
    // STATE FOR SAVE BUTTON ENABLE/DISABLE
    const [isDataFetched, setIsDataFetched] = useState(false);
    const[errorMsg,setErrorMsg]=useState("")

    const[reports,setReports]=useState({
      name:"Fayaz",
      report:{}
    })


   useEffect(()=>{
        // fetchData()
        setErrorMsg("")
   },[searchRoll])



       
   // FUNCTION TO GET STUDENT NAME FROM ROLL NUMBER
//    const fetchData = async () => {
//     if (searchRoll.length === 5) {
//         try {
//             const responseReport = await axios.get(`/classReport/GetAllReport/${id}?roll=${searchRoll}`);
//             const response = await axios.get(`/classReport/GetClassStudentDetails/${id}?roll=${searchRoll}`);
//             console.log(response.data.data,"ress")
//             const fetchedReportData = responseReport.data.report; 
//             // console.log(fetchedReportData)
//             const fetchedStudentName = response.data.data[0].student_name;
//             // console.log(response.data.data[0]._id)
//             if(response.data.data[0]){
//               console.log(response.data.data[0].syllabus,"pppp");
//               setReportData(prevState => ({
//                 ...prevState,
//                 syllabus:response.data.data[0].syllabus,
//                 classs:response.data.data[0].class,
//                 centre:response.data.data[0].centre,
//                 batch:response.data.data[0].batch,
//                 level:response.data.data[0].level,
//               }));
//             }

//             console.log(reportData,"reportt");
            
            
//             if(fetchedReportData){
//               setStudentId(fetchedReportData._id);
//               setStudentName(fetchedStudentName);
//               setReportData(prevState => ({
//                 ...prevState,
//                 name: fetchedStudentName,
//                 roll: searchRoll,
//                 studentId: fetchedReportData._id,
//                 report: fetchedReportData.report,
//                 remark: fetchedReportData.remark,
//                 reportedBy: user.firstname,
//                 followUp: fetchedReportData.followUp,
//               }));
//               setIsDataFetched(true); 
//             }else{
//                setStudentId(response.data.data[0]._id)
//             setStudentName(fetchedStudentName);
//             setReportData(prevState => ({
//                 ...prevState,
//                 name: fetchedStudentName,
//                 roll: searchRoll,
//                 reportedBy:user.firstname,
//             }));
//             setIsDataFetched(true); // Enable the save button
//         }
       
//             }
//             catch (error) {
//             console.log(error.response.data.error);
//             setErrorMsg(error.response.data.error);
//             setIsDataFetched(false); // Disable the save button
//         }
//     } else {
//         setStudentName("");
//         setReportData({
//           roll: "",
//           name: "",
//           syllabus:"",
//           classs:"",
//           centre:"",
//           batch:"",
//           level:"",
//           studentId: "",
//           report: [], 
//           remark: "",
//           reportedBy: "",
//           response:"",
//           respondedBy:"",
//           followUp: false,
//         })
//         setIsDataFetched(false); // Disable the save button
//     }
    
// };

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
    console.log(reportData);
    
  //  await axios.post(`/classReport/CreateReport/${id}`,{
  //   ...reportData,
  //   studentId,
  // })
  //   .then((res)=>{
  //     console.log(res)
  //     setSaveMessage("Report saved successfully!");
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     setSaveMessage("Failed to save Report. Please try again.");
  //   })

  //   setTimeout(() => {
  //     setSaveMessage("");
  //   }, 1000);
};

console.log(reportData,"ppp");

    
    

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
            maxLength="5"
            placeholder="Enter Roll NO"
            type="text"
            onChange={(e)=>setSearchRoll(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium text-black mb-1" htmlFor="studentName">
            Student Name : {reports? reports.name : errorMsg }
          </label>
        </div>
        {reports && (
      <div> 
        <h2 className="text-xl text-black font-semibold mb-4">Class Report</h2>

        <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 text-black gap-7 mb-6">
          <div className="flex items-center  space-x-2">
            <input id="audioDisconnected" type="checkbox" checked={reportData.report.includes("audioDisconnected")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="audioDisconnected">
              Audio Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="videoDisconnected" type="checkbox" checked={reportData.report.includes("videoDisconnected")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="videoDisconnected">
              Video Disconnected
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="rangeIssue" type="checkbox" checked={reportData.report.includes("rangeIssue")} onChange={handleCheckboxChange}  className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="rangeIssue">
              Range issue
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="phoneUse" type="checkbox" checked={reportData.report.includes("phoneUse")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="phoneUse">
              Phone Use
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="cameraArrangement" type="checkbox" checked={reportData.report.includes("cameraArrangement")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="cameraArrangement">
              Camera arrangement
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="notAttending" type="checkbox" checked={reportData.report.includes("notAttending")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="notAttending">
              Not attending
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="leftWOTPermission" type="checkbox" checked={reportData.report.includes("leftWOTPermission")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="leftWOTPermission">
              Left WOT permission
            </label>
          </div>
          {/* <div className="flex items-center space-x-2">
            <input id="followUp" type="checkbox"  checked={reportData.followUp} onChange={handleFollowUpChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="followUp">
              Follow up
            </label>
          </div> */}

        </div>
        <h2 className="text-xl text-black font-semibold mb-4">Exam Report</h2>
        <div className="grid text-black grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-7 mb-6">
          <div className="flex items-center space-x-2">
            <input id="noParent" type="checkbox" checked={reportData.report.includes("noParent")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="noParent">
              No Parent
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copy" type="checkbox" checked={reportData.report.includes("copy")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copy">
              Copy
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="copyDoubt" type="checkbox" checked={reportData.report.includes("copyDoubt")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="copyDoubt">
              Copy Doubt
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input id="parentNotVisible" type="checkbox" checked={reportData.report.includes("parentNotVisible")} onChange={handleCheckboxChange} className="rounded border-gray-300" />
            <label className="text-lg font-medium leading-none" htmlFor="parentNotVisible">
              Parent Not Visible
            </label>
          </div>

        </div>
  
        <div className="mb-6">
        <h2 className="text-xl text-black font-semibold mb-4">Status</h2>
        <div className='flex gap-4'>
        <label className="text-lg text-black font-medium leading-none">
              Follow Up
        </label>
        <Switch onChange={handleFollowUpChange} checked={reportData.followUp} />
        </div>

          <label className="block text-xl mt-4 font-bold text-black mb-1" htmlFor="remarks">
            Remarks
          </label>
          <textarea
            className="block w-full border rounded-md py-2 px-3 text-lg text-gray-700"
            id="remarks"
            placeholder="Type your remarks here."
            value={reportData.remark}
            onChange={handleRemarkChange}
          ></textarea>
        </div>
        
            <button onClick={handleSave} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Save
           </button>
           {saveMessage && <p className={saveMessage.includes("successfully") ? "text-green-600 mt-4" : "text-red-600"}>{saveMessage}</p>}
               
      </div> 
      )}
      </div> 
    </div>
  );
}

export default ClassReport;
