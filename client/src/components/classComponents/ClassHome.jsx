import React, { useEffect, useState } from 'react'
import { LuEye } from "react-icons/lu";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useParams } from 'react-router-dom';

function ClassHome() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [classData,setClassData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8055/class/getoneclass/${id}`
        );
        const data = await response.json();
        console.log(data);
        setClassData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
<div className="min-h-screen bg-gray-100 p-8 sm:p-2">
    
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        
        <div className="flex flex-col md:flex-row md:items-center mb-4 mt-4 md:mb-0">
          <h1 className="text-2xl font-semibold text-black mr-4">{classData.classsubject} - {classData.tutorname}</h1>
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
              <h3 className="text-lg font-semibold text-black">Report</h3>
              <p className="text-l text-black-500">Total reports: 05</p>
            </div>
            <div className="bg-[#90a5f8] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg text-black font-semibold">Attendance</h3>
              <p className="text-l text-white">Status: uploaded</p>
            </div>
            <div className="bg-[#BFDBFE] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold text-black">Absenties </h3>
              <p className="text-l text-black-500">Status: Updated</p>
            </div>
            <div className="bg-[#FED7AA] rounded-lg p-4 cursor-pointer">
              <h3 className="text-lg font-semibold text-black">Daily Report</h3>
              <p className="text-l text-black-500">Status: Not updated</p>
            </div>
            <div className="bg-[#ffbe74] rounded-lg p-4 col-span-2 cursor-pointer">
              <h3 className="text-lg font-semibold text-black">View Daily Report</h3>
              <p className="text-l text-black-500">Status: Uploaded</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 w-[40%] lg:w-[40%] sm:w-[100%]">
          <h2 className="text-xl text-black font-semibold mb-4">Reports</h2>

          {/* div to loop , loop each reports here */}
          <div>
            <hr></hr>
            <div className='flex flex-col mt-2 mb-2'>
              <div className='flex justify-between'>
                 <p className='text-black text-lg mb-1 font-bold'>ZA024 - Fathima Hana</p>
                 <Button onClick={handleOpen}> <LuEye className='text-xl cursor-pointer'/></Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Report
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Typography color="red" variant="h4">
            ZA024 Fathima Hana
          </Typography>
          <Typography className="text-center font-normal">
            Classil Nalla urakkam aanu, Ottum sredhikunila!!
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">

          <Button variant="gradient" onClick={handleOpen}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
                 
              </div>
              <p>Reported by : Fayaz</p>
            </div>
            <hr></hr>
          </div>
        </div>

        
      </div>
    </div> 

  )
}



export default ClassHome