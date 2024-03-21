import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiParentLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import { setToastView } from "../features/toast/toastSlice";
const StudentDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});
  const [report, setReport] = useState({
    type: "",
    reason: "",
    response: "",
  });

  const [popUp, setPopUp] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    dispatch(setLoader());
    axios
      .get(`/student/getStudentDetails/${id}`)
      .then((res) => {
        //console.log(res.data.data)
        setStudent(res.data.data);
        dispatch(removeLoader());
      })
      .catch((err) => {
        //console.log(err.response.data.error);
        dispatch(removeLoader());
        dispatch(setToastView({ type: "error", msg: err.response.data.error }));
        return navigate("/search");
      });
  }, []);
  console.log(`student details : ${student.student_name}`);
  return (
    <div className="bg-whitesmoke flex sm:flex-col lg:flex-row w-full">
      <div
        className={`${
          popUp
            ? " translate-y-0 opacity-100 backdrop-brightness-50"
            : " opacity-0 -translate-y-[400px]"
        } duration-500 report-container fixed left-0 top-0 flex w-full h-full backdrop-blur-sm justify-center items-center`}
      
      >
        <div className="relative  add-report flex flex-col bg-white sm:w-full lg:w-[40%] shadow-2xl rounded-lg items-center lg:gap-5"
        onClick={()=>setPopUp(true)}
        >
          <div className="text-2xl font-bold text-black heading-container sm:pt-5">
            Add Report
          </div>
          <div className="type-container flex lg:flex-row lg:gap-5 sm:pt-5">
            <label htmlFor="type">Call Type:</label>
            <select
              name="type"
              className="border-[1px] border-black rounded-sm"
            >
              <option value={null}>None</option>
              <option value="studyCall">Study</option>
              <option value="followUpCall">FollowUp</option>
              <option value="casualCall">Casual</option>
            </select>
          </div>
          <div className="rea-res-container w-full flex flex-col lg:p-5">
            <div className="reason-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reasontitle lg:w-[30%] sm:w-full  text-black text-xl font-Playfiar">
                Reason
              </div>
              <div className="reasoninput lg:w-[70%] sm:w-full">
                <textarea
                  placeholder="Enter the reason..."
                  className="p-2  w-full border-[1px] border-black"
                ></textarea>
              </div>
            </div>

            <div className="response-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reposetitle lg:w-[30%] sm:w-full text-black text-xl font-Playfiar">
                Reponse
              </div>
              <div className="responseinput lg:w-[70%] sm:w-full">
                <textarea
                  placeholder="Enter the response..."
                  className="p-2  w-full border-[1px] border-black rounded-sm"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="btncontainer flex w-full items-center justify-center pb-10">
            <button className="py-2 px-4 bg-custblue text-whitesmoke hover:text-white rounded-lg hover:shadow-xl shadow-black hover:scale-105 duration-150">
              Save Report
            </button>
          </div>
        </div>
      </div>
      <div className="leftdiv  h-[92vh]  sm:w-full lg:w-[35%] flex flex-col gap-10 sm:p-1 md:p-3 lg:p-10">
        <div className="profilecard bg-white shadow-lg flex flex-col w-full h-[62%] rounded-3xl gap-10 justify-center">
          <div className="imagediv flex flex-col w-full justify-center items-center gap-2">
            <div className=" font-extrabold decoration-black underline underline-offset-4">
              STUDENT DETAILS
            </div>
            <img
              src="/icons/studentBoy.avif"
              alt="studentBoy"
              className="rounded-full w-36 h-36 shadow-2xl shadow-black"
            />
          </div>
          <div className="basicdetails flex flex-col w-full justify-center items-center gap-3 font-bold text-black">
            <p className=" font-Playfiar">NAME : {student.student_name}</p>
            <p className="flex gap-5 text-xl  font-sans">
              <span>ClASS : {student.class}</span>{" "}
              <span>ROLL : {student.roll_no}</span>{" "}
            </p>
            <p>CENTER : {student.centre}</p>
          </div>
          <div className="buttondiv flex items-center justify-center gap-5">
            <button
              className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md  duration-75"
              onClick={() => setPopUp(!popUp)}
            >
              Add Report
            </button>
            <button className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md hover:scale-105 duration-75">
              View Reports
            </button>
          </div>
        </div>
        <div className="contactcard flex flex-col w-full h-[38%] border-2 rounded-3xl shadow-2xl">
          <div className="headingdiv flex w-full px-10 py-5">
            <p className="underline underline-offset-4 text-black font-bold">
              CONTACT DETAILS
            </p>
          </div>
          <div className="w-full h-full pb-10  flex flex-col items-center justify-around font-Playfiar">
            <p className="w-full flex items-center justify-center gap-5">
              <span>WHATSAPP NO :</span>
              <span> {student.whatsapp_no}</span>
              <FaPhoneSquareAlt color="green" />
            </p>

            <p className="w-full border-black flex items-center justify-center gap-5">
              <span>FATHER'S NO :</span>
              <span> {student.father_no}</span>{" "}
              <FaPhoneSquareAlt color="green" />
            </p>
            <p className="w-full  border-black flex items-center justify-center gap-5">
              <span>MOTHER'S NO :</span>
              <span> {student.mother_no}</span>{" "}
              <FaPhoneSquareAlt color="green" />
            </p>
            <p className="w-full  border-black flex items-center justify-center gap-5">
              <span>EMAIL ID:</span>
              <span> No content for email id.</span>
            </p>
          </div>
        </div>
      </div>
      <div className="rightdiv h-[92vh] sm:w-full lg:w-[65%] sm:p-1 md:p-3 lg:p-10 flex flex-col lg:gap-10">
        <div className="descDiv basis-1/2 font-enriq text-xl w-full  rounded-3xl lg:p-10 sm:p-3 md:p-5 flex flex-col gap-2 shadow-2xl">
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Father's Name </p>&nbsp;:&nbsp;<p>{student.father}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Mother's Name </p>&nbsp;:&nbsp;
            <p>{student.mother?.length === 0 ? "Not Given" : student.mother}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Address </p>&nbsp;:&nbsp;<p>{student.address} </p>
          </span>
          <span className="flex flex-row  border-b-[1px] border-gray-400">
            <p>PinCode </p>&nbsp;:&nbsp;
            <p>
              {student.pin_code?.length === 0 ? "Not Given" : student.pin_code}
            </p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Syllabus: </p>&nbsp;:&nbsp;<p>{student.syllabus}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Medium </p>&nbsp;:&nbsp;<p>{student.medium}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>School Name </p>&nbsp;:&nbsp;<p> {student.school_name}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>School Location </p>&nbsp;:&nbsp;<p>{student.school_location}</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>District </p>&nbsp;:&nbsp;<p>{student.district}</p>
          </span>
        </div>
        <div className="mainReportsContainer basis-1/2 w-fullrounded-3xl flex sm:flex-col lg:flex-row gap-5 lg:px-5">
          <div className="lg:basis-[33%] sm:basis-1  rounded-3xl shadow-md p-5">
            card1
          </div>
          <div className="lg:basis-[33%] sm:basis-1b  rounded-3xl shadow-md p-5">
            card2
          </div>
          <div className="lg:basis-[33%] sm:basis-1 rounded-3xl shadow-md p-5">
            card3
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
