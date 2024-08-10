import React, { useState, useEffect } from "react";
import ClassCard from "../../widgets/cards/ClassCard";
import {
  Button,
  ButtonGroup,
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
import Skeleton from "../../widgets/skeletonLoading/Skeleton";
import { Link } from "react-router-dom";

function DisplayClasses() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [classDetails, setClassDetails] = useState({
    selectedSyllabus: "",
    selectedClass: "",
    selectedSubject: "",
    tutorName: "",
    scheduleTime: "",
    isExam: false,
  });

  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, load]);

  // FUNCTION TO FETCH ALL CLASSES
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8055/class/getAllClass`, {
          params: {
            page: currentPage,
            limit: limit
          }
        }
      );
      const data = response.data;
      setClasses(data.classes);
      if (data.pagination && data.pagination.next) {
        setTotalPages(data.pagination.next.page);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleLoad = () => {
    setLoad((curr) => !curr);
    handleOpen();
  };

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
        handleLoad();
        setClassDetails({
          selectedSyllabus: "",
          selectedClass: "",
          selectedSubject: "",
          tutorName: "",
          scheduleTime: "",
          isExam: false,
        });
      })
      .catch((err) => console.log(err));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="p-1 flex flex-wrap flex-col items-center mt-7 min-h-screen">
      <button
        onClick={handleOpen}
        type="button"
        className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Class
      </button>

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

      <div className="flex flex-wrap justify-center">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} />
          ))
        ) : (
          classes.map((item) => (
            <Link key={item._id} to={`/classes/classhome/${item._id}`}>
              <ClassCard classDetail={item} key={item._id} />
            </Link>
          ))
        )}
      </div>

      <div className="flex justify-center mt-4">
        <ButtonGroup>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2"
          >
            Previous Page
          </Button>
          <Button>{`${currentPage} of ${totalPages}`}</Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2"
          >
            Next Page
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default DisplayClasses;
