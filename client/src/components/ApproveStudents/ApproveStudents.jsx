import React, { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import FormView from "./FormView";
import socket from "../../socket";
import { CgSandClock } from "react-icons/cg";
import addImg from "./addimg.jpg";
import { TiTick } from "react-icons/ti";
import { SERVER_URL } from "../../server";

const ApproveStudents = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [emptyList, setEmptyList] = useState(false);
  const [allCentre, setAllCentre] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [displayingStudentList, setDisplayingStudentList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [isUpdatedMsg, setIsUpdatedMsg] = useState(false);

  const [imageUrl, setImageUrl] = useState();

  const [photo, setPhoto] = useState(null);

  const [errors, setErrors] = useState({});

  const [schools, setSchools] = useState([]);

  const [isOpen, setIsOpen] = useState(true);

  const [selectedSchool, setSelectedSchool] = useState([]);

  const [syllabus, setSyllabus] = useState("");

  const [statesIn, setStatesIn] = useState([]);

  const [districtsIn, setDistrictsIn] = useState([]);

  const [levels, setLevels] = useState([]);

  const [classList, setClassList] = useState([]);

  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    gender: "",
    address: "",
    pinCode: "",
    dob: "",
    email: "",
    syllabus: "",
    level: "",
    class: "",
    country: "",
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
  });

  const socketConnection = () => {
    dispatch(setLoader());
    socket.connect();
    socket.on("connect", () => {
      dispatch(removeLoader());
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
      dispatch(removeLoader());
      setEmptyList(true);
    });
  };

  //get all centreNames and tags
  const fetchAllCetres = () => {
    dispatch(setLoader());
    axios
      .get("/centre/getCentreTags")
      .then((res) => {
        setAllCentre(res.data.data);
        dispatch(removeLoader());
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(removeLoader());
      });
  };

  useEffect(() => {
    socketConnection();
    fetchStudents();
    fetchAllCetres();

    return () => {
      //on component unmount
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


  const previewHandler = (item, index) => {
    const isoStringToInputValue = (isoString) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    const actDate = isoStringToInputValue(item.dob);
    setSelectedIndex(item._id);
    setOpenPreview(true);
    const imageName = item.image;
    if (imageName.length === 0) {
      setImageUrl(addImg);
    }
    const url = `${SERVER_URL}/uploads/students/${imageName}`;
    setImageUrl(url);
    setFormData({
      _id: item._id,
      fullName: item.student_name,
      gender: item.gender,
      address: item.address,
      pinCode: item.pin_code,
      dob: actDate,
      email: item.email,
      class: item.class,
      syllabus: item.syllabus,
      centre: item.centre,
      medium: item.medium,
      district: item.district,
      state: item.state,
      country: item.country,
      level: item.level,
      fatherName: item.father,
      motherName: item.mother,
      fatherOccupation: item.fathers_occupation,
      motherOccupation: item.mothers_occupation,
      rollNumber: item.roll_no,
      fatherNumber: item.father_no,
      motherNumber: item.mother_no,
      whatsappNumber: item.whatsapp,
    });

    setErrors({});
    setSelectedSchool(item.school_name);
    //socket to show a student is selected for approval process
    socket.emit("student_selected", { userId: user.id, studentId: item._id });
  };

  // console.log(selectedSchool)

  //receiving the selected studentIds from the backend
  socket.on("student_ids", (student) => {
    //console.log("ids array on selection", student.studentIds);
    setSelectedStudents(student.studentIds);
  });

  //getting initial students array
  socket.on("initial_students", (student) => {
    // console.log("initial selected students", selectedStudents);
    setSelectedStudents(student.studentIds);
  });

  //getting updated pendingapprovalstudent list and selected students
  socket.on("after-student-updation", (student) => {
    console.log("hoiii...hoii....", student);
    setSelectedStudents(student.studentIds);
    setStudentsList([...student.students]);
    setDisplayingStudentList([...student.students]);
  });

  //console.log("updated student list is",displayingStudentList)

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
    <div className="relative">
      {isUpdatedMsg && (
        <span
          className={`absolute bg-green-200 border border-green-400 px-4 py-2 rounded-md right-5 top-5 text-gray-700 flex justify-center items-center z-10 gap-2`}
        >
          <div className="flex p-[1px] justify-center items-center rounded-full border border-gray-500">
            <TiTick className="text-2xl text-green-500" />
          </div>
          <span>Updation successFul</span>
        </span>
      )}

      <div className="sm:hidden lg:flex w-full lg:h-[84vh] 2xl:h-[88vh] overflow-y-hidden pt-3 gap-2">
        <div className="leftcontainer w-[30%] bg-white rounded-lg flex flex-col h-full pt-4  px-2">
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
                        selectedIndex === item._id &&
                        " bg-blue-gray-900 text-white"
                      } flex cursor-pointer flex-row w-full text-xl h-10 text-gray-700 rounded-md p-2 border-black border-[1px] gap-2`}
                      onClick={() => previewHandler(item, index)}
                      key={index}
                      disabled={selectedStudents.includes(item._id)}
                    >
                      <div className="w-[20%] text-lg uppercase">{item.roll_no}</div>
                      <div className="w-[80%] text-lg capitalize flex">
                        {item.student_name}
                      </div>
                      {selectedStudents.includes(item._id) && (
                        <div className="absolute right-5 text-gray">
                          <CgSandClock color="" className=" animate-pulse" />
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
        
        <div className="previewcontainer relative w-[70%] bg-white rounded-lg  flex flex-col h-full overflow-y-scroll pt-4 px-2">
          <div className="previewtitlecontainer flex h-10 w-full justify-center items-center">
            <span className="text-2xl ">
              <h2 className=" border-gray-300 border-b-2 px-2 font-enriq">
                PREVIEW
              </h2>
            </span>
          </div>
          <div className="">
            {openPreview ? (
              <div>
                <FormView
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  photo={photo}
                  setPhoto={setPhoto}
                  errors={errors}
                  setErrors={setErrors}
                  schools={schools}
                  setSchools={setSchools}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedSchool={selectedSchool}
                  setSelectedSchool={setSelectedSchool}
                  syllabus={syllabus}
                  setSyllabus={setSyllabus}
                  statesIn={statesIn}
                  setStatesIn={setStatesIn}
                  formData={formData}
                  setFormData={setFormData}
                  levels={levels}
                  setLevels={setLevels}
                  classList={classList}
                  setClassList={setClassList}
                  districtsIn={districtsIn}
                  setDistrictsIn={setDistrictsIn}
                  allCentre={allCentre}
                  setIsUpdatedMsg={setIsUpdatedMsg}
                  setOpenPreview={setOpenPreview}
                  setSelectedIndex={setSelectedIndex}
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
