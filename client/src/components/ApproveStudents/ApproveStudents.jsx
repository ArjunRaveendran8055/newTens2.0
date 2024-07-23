import React, { useEffect, useState } from "react";
import { Select, Option, Button, useSelect } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import FormView from "./FormView";
import socket from "../../socket";
import { CgSandClock } from "react-icons/cg";

const ApproveStudents = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [allCentre, setAllCentre] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    address: "",
    pinCode: "",
    dob: "",
    email: "",
    class: "",
    syllabus: "",
    school: "",
    schoolLocation: "",
    medium: "",
    state: "",
    district: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    rollNumber: "",
    fatherNumber: "",
    motherNumber: "",
    whatsappNumber: "",
    centre: "",
    academicStatus: "",
    hearAbout: "",
    difficultSubjects: [],
    siblings: [],
  });

  const [selectedSchool, setSelectedSchool] = useState([]);
  const [syllabus, setSyllabus] = useState("");
  const [statesIn, setStatesIn] = useState("");

  const socketConnection = () => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    //on failed connection
    socket.on("connect_failed", function () {
      document.write("Sorry, there seems to be an issue with the connection!");
    });

    //connection error
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  };

  const fetchStudents = () => {
    dispatch(setLoader());
    socket.emit("fetchstudents", {});
    //getting studentList from socket
    socket.on("students_list", (data) => {
      setStudentsList([...data.students]);
      dispatch(removeLoader());
    });

    //getting noPending response
    socket.on("no_pending_students", (msg) => {
      console.log(msg);
    });
  };

  useEffect(() => {
    // dispatch(setLoader());
    socketConnection();
    fetchStudents();

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  const previewHandler = (item, index) => {
    console.log("index", index);
    console.log("selected student is:",item._id)
    setSelectedIndex(index);
    setOpenPreview(true);
    // console.log(item.student_name);
    // console.log(item);
    setFormData({
      fullName: item.student_name,
      gender: item.gender,
      address: item.address,
      pinCode: item.pin_code,
      dob: item.dob,
      email: item.email,
      class: item.class,
      syllabus: item.syllabus,
      school: item.school_name,
      schoolLocation: item.school_location,
      medium: item.medium,
      state: "",
      district: item.district,
      fatherName: item.father,
      motherName: item.mother,
      fatherOccupation: item.fathers_occupation,
      motherOccupation: item.mothers_occupation,
      rollNumber: item.roll_no,
      fatherNumber: item.father_no,
      motherNumber: item.mother_no,
      whatsappNumber: item.whatsapp,
      centre: item.centre,
    });

    setSelectedSchool(item.school_name);
    // console.log(item.state)
    setStatesIn(item.state);
    setSyllabus(item.syllabus);

    //socket to show a student is selected for approval process
    socket.emit("student_selected", {userId: user.id,studentId:item._id });
  };

  //receiving the selected studentIds from the backend
  socket.on("student_ids", (student) => {
    console.log("ids array on selection", student.studentIds);
    setSelectedStudents(student.studentIds);
  });

  //getting initial students array
  socket.on("initial_students", (student) => {
    console.log("initial selected students",selectedStudents)
    setSelectedStudents(student.studentIds);
  });

  return (
    <div>
      <div className="sm:hidden lg:flex w-full h-[88vh] pt-3 px-2 gap-2">
        <div className="leftcontainer w-[40%] bg-white rounded-lg flex flex-col h-full pt-4  px-2">
          <div className="sortcontainer flex justify-end  items-center mb-2">
            <span>Centre&nbsp;</span>
            <div>
              <Select>
                <Option value="">All</Option>
                {allCentre?.map((item, index) => (
                  <Option key={index} className="uppercase" value={item.name}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <Divider />
          <div className="flex flex-row w-full p-2 text-black">
            <div className="w-[20%]">ROLL</div>
            <div className="w-[90%]">NAME</div>
          </div>
          <div className="studentlistcontainer flex flex-col gap-2 w-full overflow-y-scroll relative">
            {studentsList.map((item, index) => (
              <div className="relative" key={index}>
                <button
                  className={` ${
                    selectedIndex === index && " bg-blue-gray-900 text-white"
                  } flex cursor-pointer flex-row w-full text-xl text-gray-700 rounded-md uppercase p-2 border-black border-[1px]`}
                  onClick={() => previewHandler(item, index)}
                  key={index}
                  disabled={selectedStudents.includes(item._id)}
                >
                  <div className="w-[20%]">{item.roll_no}</div>
                  <div className="w-[90%]">{item.student_name}</div>
                  {selectedStudents.includes(item._id) && (
                    <div className="absolute right-5">
                      <CgSandClock color="red" />
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="vrtline w-[1px]  bg-black" />
        <div className="previewcontainer w-[60%] bg-white rounded-lg  flex flex-col h-full overflow-y-scroll pt-4 px-2">
          <div className="previewtitlecontainer flex h-10 w-full justify-center items-center">
            <span className="text-2xl">
              <h2 className=" border-black border-b-2 px-2">Preview</h2>
            </span>
          </div>
          <div className="">
            {openPreview ? (
              <div>
                <FormView
                  formData={formData}
                  setFormData={setFormData}
                  selectedSchool={selectedSchool}
                  setSelectedSchool={setSelectedSchool}
                  statesIn={statesIn}
                  setStatesIn={setStatesIn}
                  syllabus={syllabus}
                  setSyllabus={setSyllabus}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full mt-[60%] text-xl">
                No Students Selected for Preview
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:hidden flex h-[75vh] justify-center items-center">
        <div className="">Not optimized for mobile screen</div>
      </div>
    </div>
  );
};

export default ApproveStudents;
