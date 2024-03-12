import React, { useState } from "react";
import ClassCard from "../../widgets/cards/ClassCard";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";

function DisplayClasses() {
  const [open, setOpen] = useState(false);
  const [classDetails, setClassDetails] = useState({
    selectedSyllabus: '',
    selectedClass: '',
    selectedSubject: '',
    tutorName: '',
    scheduleTime: '',
    isExam: false,
  });

  const handleOpen = () => {
    setOpen((cur) => !cur)
  };

  // HANDLE INPUT FUNCTION
  const handleInputChange = (fieldName, value) => {
    setClassDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = (isChecked) => {
    setClassDetails((prevDetails) => ({
      ...prevDetails,
      isExam: isChecked,
    }));
  };

  // Validate fields before submitting
  const handleSubmit = () => {
    if (
      classDetails.selectedClass.trim() === '' ||
      classDetails.selectedSubject.trim() === '' ||
      classDetails.tutorName.trim() === '' ||
      classDetails.scheduleTime.trim() === ''||
      classDetails.selectedSyllabus.trim() === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // POSTING DATA TO SERVER
    axios.post('/class/createClass',{
      tutorname:classDetails.tutorName,
    classname:classDetails.selectedClass,
    classdate:classDetails.scheduleTime,
    classexam:classDetails.isExam,
    classsyllabus:classDetails.selectedSyllabus,
    classsubject:classDetails.selectedClass,
    })
    .then((res)=>{
      console.log(res.data)
      handleOpen()
    })
    .catch((err)=>console.log(err))
  };

  return (
    <div className="p-1 flex flex-wrap flex-col items-center mt-7 min-h-screen">
      {/* BUTTON FOR ADDING A NEW CLASS */}
      <button
        onClick={handleOpen}
        type="button"
        className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Class
      </button>
      {/* POP UP DIV */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create Class
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Select Syllabus
            </Typography>

            <div className="w-100">
              <Select label="Class" onChange={(value) => handleInputChange('selectedSyllabus', value)}>
                <Option value="state">STATE</Option>
                <Option value="cbse">CBSE</Option>
              </Select>
            </div>

            {/* CLASS SELECTION BOX */}
            <Typography className="-mb-2" variant="h6">
              Select Class
            </Typography>

            <div className="w-100">
              <Select label="Class" onChange={(value) => handleInputChange('selectedClass', value)}>
                <Option value="class 12">Class 12</Option>
                <Option value="class 10">Class 10</Option>
                <Option value="class 9">Class 9</Option>
                <Option value="class 8">Class 8</Option>
              </Select>
            </div>
            {/* SUBJECT SELECTION BOX */}
            <Typography className="-mb-2" variant="h6">
              Select Subject
            </Typography>

            <div className="w-100">
              <Select label="Subject" onChange={(value) => handleInputChange('selectedSubject', value)}>
                <Option value="maths">Maths</Option>
                <Option value="biology">Biology</Option>
                <Option value="chemistry">Chemistry</Option>
                <Option value="physics">Physics</Option>
                <Option value="english">English</Option>
                <Option value="hindi">Hindi</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>

            <Typography className="-mb-2" variant="h6">
              Tutor
            </Typography>
            <Input label="Enter Tutor Name" size="lg" onChange={(e) => handleInputChange('tutorName', e.target.value)}/>

            <Typography className="-mb-2" variant="h6">
              Date & Time
            </Typography>
            <Input
              label="Schedule time"
              type="datetime-local"
              className="mmm"
              onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox onChange={(isChecked) => handleCheckboxChange(isChecked.target.checked)} label="Exam" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      {/* LISTING THE CLASSES FETCHED FROM DB */}
      <div className="flex flex-wrap justify-center">
        <ClassCard />
        <ClassCard /> <ClassCard /> <ClassCard /> <ClassCard />
      </div>
    </div>
  );
}

export default DisplayClasses;
