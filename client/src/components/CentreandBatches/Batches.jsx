import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { Link ,useParams} from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import allSyllabus from "../../layouts/syllabus.json";

function Batches() {
  const [isVisible, setIsVisible] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [classStandard, setClassStandard] = useState('');
  const [stream, setStream] = useState('');
  const [error, setError] = useState('');
  const [classes, setClasses] = useState([]);
  const [error2, setError2] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

const [selectedSyllabus, setSelectedSyllabus] = useState("");
const [selectedStream, setSelectedStream] = useState("");
const [selectedClass, setSelectedClass] = useState("");
const [availableStreams, setAvailableStreams] = useState([]);
const [availableClasses, setAvailableClasses] = useState([]);

    // centre ID
    const { id } = useParams();

    const openModal = (item) => {
      setItemToDelete(item);
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
      setItemToDelete(null);
    };
  

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`/centre/getAllClass/${id}`);
        setClasses(response.data);
      } catch (error) {
        setError2('Error fetching classes');
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
    setIsFormSubmitted(false)
    setIsVisible(true);
  }, [isFormSubmitted]);


  useEffect(() => {
    const defaultSyllabus = "state"; // Or "state" if you prefer
    const syllabusData = allSyllabus.find(syllabus => syllabus.syllabus === defaultSyllabus);
    setAvailableStreams(syllabusData ? syllabusData.levels : []);
  }, []);

  const handleStreamChange = (value) => {
    setSelectedStream(value);
    const streamData = availableStreams.find(stream => stream.level === value);
    setAvailableClasses(streamData ? streamData.classes : []);
    setSelectedClass("");
  };
  

  // const handleClassChange = (e) => {
  //   const value = e.target.value;
  //   if (value > 12 ) {
  //     setError('Class (Standard) should not be greater than 12');
  //   } else {
  //     setError('');
  //   }
  //   setClassStandard(value);
  // };

  const handleOpenAddClass = () => {
    setOpenAddClass((cur) => !cur);
  };
  
  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleSubmit = async () => {
    if (classStandard <= 12) {
      const classData = {
        class: selectedClass,
        stream: selectedStream
      };

      try {
        const response = await axios.put(`/centre/addClass/${id}`, classData);
        // console.log('Updated Centre:', response.data);
        // Close the dialog or reset the form here if needed
        setIsFormSubmitted(true)
        setClassStandard('');
        setStream('');
        handleOpenAddClass(); // Close the dialog
        setSelectedClass("")
        setSelectedStream("")
      } catch (error) {
        console.error('Error adding class:', error);
      }
    } else {
      setError('Class (Standard) should not be greater than 12');
    }
  };


  const deleteClass = async (classStandard,stream) => {
    try {
      const response = await axios.delete(`/centre/deleteCentreClass/${id}`, {
        data: { class: classStandard, stream: stream }
      });
      setClasses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      setError('Error deleting class');
      console.error('Error deleting class:', error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto my-8 flex flex-col">
       <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold">PARAVOOR - CLASS LIST</h1>
    {error2 && <p style={{ color: 'red' }}>{error2}</p>}
  </div>
  <div className="flex items-center justify-center pb-6 mb-6 border-black border-b-[1px]">
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      onClick={() => setOpenAddClass(true)}>
      Add Class
    </button>
  </div>

  <Dialog size="md" open={openAddClass} handler={handleOpenAddClass} className="flex">
    <Card className="mx-auto w-full">
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h4" color="blue-gray">Add Class</Typography>

        <Typography className="-mb-2" variant="h6">Stream</Typography>
        <Select
          label="Select Stream"
          value={selectedStream}
          onChange={handleStreamChange}
        >
          {availableStreams.map((stream, index) => (
            <Option key={index} value={stream.level}>{stream.txt}</Option>
          ))}
        </Select>

        {availableClasses.length > 0 && (
          <>
            <Typography className="-mb-2" variant="h6">Class</Typography>
            <Select
              label="Select Class"
              value={selectedClass}
              onChange={handleClassChange}
            >
              {availableClasses.map((cls, index) => (
                <Option key={index} value={cls.cls}>{cls.txt}</Option>
              ))}
            </Select>
          </>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleSubmit} fullWidth>Create</Button>
      </CardFooter>
    </Card>
  </Dialog>

      {/* LOOP CLASSES FROM HERE */}
      {classes.map((cls, index) => (
      
      <div key={index} className={`space-y-4 mt-5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}  transition-transform duration-1000`}>
        <Card className="flex flex-col">
          <div className="flex items-start space-x-4 p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold">Class {cls.class} - {cls.stream}</h2>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">Accessing classes made easy. Track, analyse and execute!</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">                                                                                 
                <span>#new10s</span>
                <span>#analytics</span>
              </div>
            </div>
            <div className="text-lg font-semibold self-end">2732 Students</div>
          </div>
          <div className="flex justify-between items-center space-x-2 border-t p-4">
          <Link to={`/allcentres/displaybatches/${id}?class=${cls.class}&stream=${cls.stream}`}>
            <Button variant="outlined" className="text-sm" >
              Batches
            </Button>
          </Link>
          <MdDelete color="red"  onClick={() => openModal(cls)} size={25} className="cursor-pointer" />
          </div>
        </Card> 
      </div>

))}

{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl mb-4">Delete Confirmation</h2>
            <p>Are you sure you want to delete {itemToDelete?.class +" ("+ itemToDelete?.stream + ")"} ?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={()=>deleteClass(itemToDelete.class,itemToDelete.stream)}>
                Yes, Delete
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Batches;
