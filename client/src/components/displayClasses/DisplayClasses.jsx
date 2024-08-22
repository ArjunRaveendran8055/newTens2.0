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
import { MdDelete } from "react-icons/md";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, load]);

  // FUNCTION TO FETCH ALL CLASSES
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/class/getAllClass`, {
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
        classsubject: classDetails.selectedSubject,
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

  const confirmDelete = () => {
    if (classToDelete) {
      axios
        .delete(`/class/deleteClass/${classToDelete}`)
        .then(() => {
          fetchData(); // Refresh the list of classes after deletion
          closeDeleteDialog();
        })
        .catch((err) => console.log(err));
    }
  };

  const openDeleteDialog = (classId) => {
    setClassToDelete(classId);
    setIsDeleteDialogOpen(true);
  };
  
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setClassToDelete(null);
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
                label="Syllabus"
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
                <Option value="12">Class 12</Option>
                <Option value="11">Class 11</Option>
                <Option value="10">Class 10</Option>
                <Option value="9">Class 9</Option>
                <Option value="8">Class 8</Option>
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
     
      <div className="flex flex-wrap ml-10 sm:ml-7">
        {isLoading ? (
          Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} />
          ))
        ) : (
          classes.map((item) => (
            <div key={item._id} className="relative group">
            <Link to={`/classes/classhome/${item._id}`}>
              <ClassCard classDetail={item} />
            </Link>
            <button
              onClick={() => openDeleteDialog(item._id)}
              className="absolute bottom-7 right-8 text-red-500 transition-opacity"
            >
              {/* Replace with your preferred delete icon */}
             <MdDelete color="white" size={26}/>
            </button>
          
            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} handler={closeDeleteDialog}>
              <Card>
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    Confirm Deletion
                  </Typography>
                  <Typography>
                    Are you sure you want to delete this class? This action cannot be undone.
                  </Typography>
                </CardBody>
                <CardFooter className="flex justify-end gap-4">
                  <Button color="blue-gray" onClick={closeDeleteDialog}>
                    Cancel
                  </Button>
                  <Button color="red" onClick={confirmDelete}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </div>
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
