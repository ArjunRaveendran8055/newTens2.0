import React, { useState, useEffect } from "react";
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
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import axios from "axios";
import Skeleton from "../../widgets/skeletonLoading/Skeleton";
import { Link } from "react-router-dom";

function DisplayClasses() {
  const [open, setOpen] = useState(false);
  const [classDetails, setClassDetails] = useState({
    selectedSyllabus: "",
    selectedClass: "",
    selectedSubject: "",
    tutorName: "",
    scheduleTime: "",
    isExam: false,
  });

  // pagination state's
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // function to fetch classes from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8055/class/getAllClass?page=${currentPage}&limit=${limit}`
        );
        const data = await response.json();
        setClasses(data.classes);
        setIsLoading(false);
        // console.log(data)
        setTotalPages(data.pagination.next?.page);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, limit, open]);<div className="0"></div>

  const handleOpen = () => {
    setOpen((cur) => !cur);
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
      classDetails.selectedClass.trim() === "" ||
      classDetails.selectedSubject.trim() === "" ||
      classDetails.tutorName.trim() === "" ||
      classDetails.scheduleTime.trim() === "" ||
      classDetails.selectedSyllabus.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // POSTING DATA TO SERVER
    axios
      .post("/class/createClass", {
        tutorname: classDetails.tutorName,
        classname: classDetails.selectedClass,
        classdate: classDetails.scheduleTime,
        classexam: classDetails.isExam,
        classsyllabus: classDetails.selectedSyllabus,
        classsubject: classDetails.selectedClass,
      })
      .then((res) => {
        console.log(res.data);
        handleOpen();
        setClassDetails({
          selectedSyllabus: "",
          selectedClass: "",
          selectedSubject: "",
          tutorName: "",
          scheduleTime: "",
          isExam: false,
        })
        
      })
      .catch((err) => console.log(err));
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
              <Select
                label="Class"
                onChange={(value) =>
                  handleInputChange("selectedSyllabus", value)
                }
              >
                <Option value="state">STATE</Option>
                <Option value="cbse">CBSE</Option>
              </Select>
            </div>

            {/* CLASS SELECTION BOX */}
            <Typography className="-mb-2" variant="h6">
              Select Class
            </Typography>

            <div className="w-100">
              <Select
                label="Class"
                onChange={(value) => handleInputChange("selectedClass", value)}
              >
                <Option value="12TH">Class 12</Option>
                <Option value="11TH">Class 11</Option>
                <Option value="10TH">Class 10</Option>
                <Option value="9TH">Class 9</Option>
                <Option value="8TH">Class 8</Option>
              </Select>
            </div>
            {/* SUBJECT SELECTION BOX */}
            <Typography className="-mb-2" variant="h6">
              Select Subject
            </Typography>

            <div className="w-100">
              <Select
                label="Subject"
                onChange={(value) =>
                  handleInputChange("selectedSubject", value)
                }
              >
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
            <Input
              label="Enter Tutor Name"
              size="lg"
              onChange={(e) => handleInputChange("tutorName", e.target.value)}
            />
            <Typography className="-mb-2" variant="h6">
              Date & Time
            </Typography>
            <Input
              label="Schedule time"
              type="datetime-local"
              className="mmm"
              onChange={(e) =>
                handleInputChange("scheduleTime", e.target.value)
              }
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox
                onChange={(isChecked) =>
                  handleCheckboxChange(isChecked.target.checked)
                }
                label="Exam"
              />
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
        
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
          
            {classes.map((item,index) => (
              <Link key={index} to={`/classhome/${item._id}`}>
              <ClassCard classDetail={item} key={item._id} />
              </Link>
            ))}
          </>
         
        )}
      </div>

      {/* <div>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>Previous Page</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}>Next Page</button>
      </div> */}

      {classes.length>10 &&

      <div>
        <ButtonGroup variant="outlined">
          <IconButton
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <IconButton
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </IconButton>
          ))}
          <IconButton
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </ButtonGroup>
      </div>
      }
    </div>
  );
}

export default DisplayClasses;
