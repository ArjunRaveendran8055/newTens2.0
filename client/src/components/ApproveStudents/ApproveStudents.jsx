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
  const [emptyList, setEmptyList] = useState(true);
  const [allCentre, setAllCentre] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [displayingStudentList, setDisplayingStudentList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [refId, setRefId] = useState("");
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
      setEmptyList(false);
      setDisplayingStudentList([...data.students]);
    });
    //getting noPending response
    socket.on("no_pending_students", (msg) => {
      console.log(msg);
      setEmptyList(true);
    });
  };

  //get all centreNames and tags
  const fetchAllCetres = () => {
    axios
      .get("/centre/getCentreTags")
      .then((res) => {
        setAllCentre(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    // dispatch(setLoader());
    socketConnection();
    fetchStudents();
    fetchAllCetres();

    return () => {
      socket.off("connect");
      socket.off("students_list");
      socket.off("connect_failed");
      socket.off("connect_error");
      socket.off("no_pending_students");
      socket.off("student_ids");
      socket.off("initial_students");
      socket.disconnect();
    };
  }, []);

  // console.log("all centres are", allCentre);
  const previewHandler = (item, index) => {
    //console.log("index", index);
    //console.log("selected student is:", item._id);
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
    socket.emit("student_selected", { userId: user.id, studentId: item._id });
  };

  //receiving the selected studentIds from the backend
  socket.on("student_ids", (student) => {
    console.log("ids array on selection", student.studentIds);
    setSelectedStudents(student.studentIds);
  });

  //getting initial students array
  socket.on("initial_students", (student) => {
    // console.log("initial selected students", selectedStudents);
    setSelectedStudents(student.studentIds);
  });

  //on changing ref Id in the refid input box
  const refIdChangeHandler = (e) => {
    console.log("changing ref is:", e.target.value);
    setDisplayingStudentList(() =>
      studentsList.filter((student) =>
        student.responseId.includes(e.target.value)
      )
    );
  };
  //console.log("updated display classes", displayingStudentList);

  return (
    <div>
      <div className="sm:hidden lg:flex w-full h-[88vh] pt-3 px-2 gap-2">
        <div className="leftcontainer w-[40%] bg-white rounded-lg flex flex-col h-full pt-4  px-2">
          <div className="sortcontainer flex justify-end  items-center mb-2">
            <div className="w-full flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Referance Id"
                className="p-2 border-[1px] border-gray-300 rounded-md outline-none"
                onChange={refIdChangeHandler}
              />
              <button className="bg-blue-400 hover:bg-blue-700 transition-colors duration-100 py-2 px-3 rounded-r-md font-enriq text-white">
                Go
              </button>
            </div>
          </div>
          <Divider />
          <div className="w-full flex justify-end pt-2">
            <span className="flex gap-2 justify-center items-center">
              <span>Sort</span>
              <select
                name=""
                id=""
                className="h-7 w-32 border-[1px] border-gray-500 rounded-md"
              >
                <option value="" defaultValue>
                  All
                </option>
                {allCentre.map((item, index) => (
                  <option key={index} value={`${item.centre}`}>
                    {item.tag}
                  </option>
                ))}
              </select>
            </span>
          </div>
          {emptyList ? (
            <div className="w-full h-full text-gray-700 flex justify-center items-center">
              <span>No users in Pending</span>
            </div>
          ) : (
            <>
              <div className="flex flex-row w-full p-2 text-black gap-2">
                <div className="w-[20%] flex justify-center">Roll</div>
                <div className="w-[80%] flex ">Name</div>
              </div>
              <div className="studentlistcontainer flex flex-col gap-2 w-full overflow-y-scroll relative">
                {displayingStudentList.map((item, index) => (
                  <div className="relative" key={index}>
                    <button
                      className={` ${
                        selectedIndex === index &&
                        " bg-blue-gray-900 text-white"
                      } flex cursor-pointer flex-row w-full text-xl text-gray-700 rounded-md p-2 border-black border-[1px] gap-2`}
                      onClick={() => previewHandler(item, index)}
                      key={index}
                      disabled={selectedStudents.includes(item._id)}
                    >
                      <div className="w-[20%] uppercase">{item.roll_no}</div>
                      <div className="w-[80%] capitalize flex">
                        {item.student_name}
                      </div>
                      {selectedStudents.includes(item._id) && (
                        <div className="absolute right-5">
                          <CgSandClock color="red" />
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
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
