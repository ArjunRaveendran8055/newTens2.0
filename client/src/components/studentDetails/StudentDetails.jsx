import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiParentLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Select, Option, button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import { setToastView } from "../features/toast/toastSlice";
import "react-vertical-timeline-component/style.min.css";

const StudentDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //console.log("user is:",user);
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});
  const [report, setReport] = useState({
    type: "",
    reason: "",
    response: "",
  });

  const [openAddReport, setOpenAddReport] = useState(false);
  const [openViewReports, setOpenViewReports] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

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

  const handleOpenAddReport = () => {
    setOpenAddReport((cur) => !cur);
  };

  const handleOpenViewReports = () => {
    setOpenViewReports((prev) => !prev);
  };
  //function handling reason change

  const reasonChangeHandler = (e) => {
    setErrMsg("");
    //trimming whitespace at the end and begining
    const updatedReason = e.target.value.trimStart();
    //trimming enter key and multiple white spaces in between
    const trimmedReason = updatedReason.replace(/\s{2,}|\n{2,}/g, " ");
    // console.log("final reason is",trimmedReason)
    setReport({ ...report, reason: trimmedReason });
  };

  const responseChangeHandler = (e) => {
    setErrMsg("");
    //trimming whitespace at the end and begining
    const updatedResponse = e.target.value.trimStart();
    //trimming enter key and multiple white spaces in between
    const trimmedResponse = updatedResponse.replace(/\s{2,}|\n{2,}/g, " ");
    // console.log("final reason is",trimmedResponse)
    setReport({ ...report, response: trimmedResponse });
  };

  const onSaveReportHandler = () => {
    if (report.type.length === 0) {
      return setErrMsg("*( Please Select Type of Call.)");
    }
    if (report.reason.length < 10) {
      return setErrMsg("*( Please Enter Detailed Reason.)");
    }
    if (report.response.length < 10) {
      return setErrMsg("*( Please Enter Detailed Response.)");
    }

    setBtnLoader(true);
    //add report to the current student
    axios
      .post("/student/addReport", {
        id: id,
        callType: report.type,
        reason: report.reason,
        response: report.response,
        calledBy: `${user.firstname + " " + user.lastname}`,
      })
      .then((res) => {
        setReport({
          type: "",
          reason: "",
          response: "",
        });
        setOpenAddReport(false);
        setBtnLoader(false);
        dispatch(setToastView({ type: "success", msg: res.data.message }));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="bg-whitesmoke flex sm:flex-col lg:flex-row w-full">
      <Dialog
        size="md"
        open={openAddReport}
        handler={handleOpenAddReport}
        className="shadow-none w-full flex items-center justify-center"
      >
        <div className="relative  add-report flex flex-col bg-white sm:w-full shadow-2xl rounded-lg items-center lg:gap-5">
          <div className="text-2xl font-bold text-black heading-container sm:pt-5">
            Add Report
          </div>
          <div className="text-custred">{errMsg}</div>
          <div className="pt-5 flex gap-5">
            <Select
              id="callType"
              label="CallType"
              onChange={(e) => {
                setReport({ ...report, type: e }), setErrMsg("");
              }}
              size="md"
            >
              <Option value={"studyCall"}>Study</Option>
              <Option value="followUpCall">FollowUp</Option>
              <Option value="casualCall">Casual</Option>
            </Select>
          </div>
          <div className="rea-res-container w-full flex flex-col lg:p-5">
            <div className="reason-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reasontitle lg:w-[30%] sm:w-full  text-black text-xl font-Playfiar">
                Reason
              </div>
              <div className="reasoninput lg:w-[70%] sm:w-full">
                <textarea
                  placeholder={`${"Enter the reason.."}`}
                  className={`p-2  w-full border-[1px] border-black font-bold`}
                  onChange={reasonChangeHandler}
                  value={report.reason}
                ></textarea>
              </div>
            </div>

            <div className="response-container w-full flex sm:flex-col lg:flex-row sm:gap-2 lg:gap-0 p-2">
              <div className="reposetitle lg:w-[30%] sm:w-full text-black text-xl font-Playfiar">
                Reponse
              </div>
              <div className="responseinput lg:w-[70%] sm:w-full">
                <textarea
                  value={report.response}
                  placeholder={`Enter the response...`}
                  className={`p-2  w-full border-[1px] border-black rounded-sm font-bold `}
                  onChange={responseChangeHandler}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="btncontainer flex w-full items-center justify-center pb-10">
            {btnLoader ? (
              <button className="py-2 px-4 bg-custblue text-whitesmoke hover:text-white rounded-lg hover:shadow-xl shadow-black hover:scale-105 duration-150">
                Keep Waiting..
              </button>
            ) : (
              <button
                className="py-2 px-4 bg-custblue text-whitesmoke hover:text-white rounded-lg hover:shadow-xl shadow-black hover:scale-105 duration-150"
                onClick={onSaveReportHandler}
              >
                Save Report
              </button>
            )}
          </div>
        </div>
      </Dialog>

      {/* view Report div */}

      <div className="leftdiv sm:h-[95vh] lg:h-[92vh]  sm:w-full lg:w-[35%] flex flex-col sm:gap-2 lg:gap-3 xl:gap-10 sm:p-1 md:p-3 lg:p-2  xl:p-10">
        <div className="profilecard bg-white shadow-lg flex flex-col w-full sm:h-[70%] lg:h-[65%] rounded-3xl  justify-around">
          <div className="imagediv flex flex-col w-full justify-center items-center gap-2">
            <div className=" font-extrabold sm:text-lg md:text-xl lg:text-lg  decoration-black underline underline-offset-4">
              STUDENT DETAILS
            </div>
            <img
              src="/icons/studentBoy.avif"
              alt="studentBoy"
              className="rounded-full sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-28 lg:h-28 xl:w-36 xl:h-36 shadow-2xl shadow-black"
            />
          </div>
          <div className="basicdetails flex flex-col w-full justify-center items-center gap-3 font-bold text-black">
            <p className=" font-Playfiar sm:text-md md:text-2xl lg:text-xl">
              NAME : {student.student_name}
            </p>
            <p className="flex gap-5 sm:text-xl md:text-2xl lg:text-xl  font-sans">
              <span className="sm:text-md md:text-3xl lg:text-xl">
                ClASS : {student.class}
              </span>{" "}
              <span className="sm:text-md md:text-3xl lg:text-xl">
                ROLL : {student.roll_no}
              </span>{" "}
            </p>
            <p className="sm:text-md md:text-3xl lg:text-xl">
              CENTER : {student.centre}
            </p>
          </div>
          <div className="buttondiv flex items-center justify-center gap-5">
            <button
              className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md  duration-75"
              onClick={() => setOpenAddReport(!openAddReport)}
            >
              Add Report
            </button>

            {openViewReports ? (
              <button
                className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md hover:scale-105 duration-75"
                onClick={handleOpenViewReports}
              >
                View Reports
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md hover:scale-105 duration-75"
                onClick={handleOpenViewReports}
              >
                Hide Reports
              </button>
            )}
          </div>
        </div>
        <div className="contactcard flex flex-col w-full h-[38%] border-2 rounded-3xl shadow-2xl">
          <div className="headingdiv flex w-full px-10 sm:py-3 lg:py-5">
            <p className="underline underline-offset-4 text-black font-bold sm:text-md md:text-xl lg:text-xl">
              CONTACT DETAILS
            </p>
          </div>
          <div className="w-full h-full pb-10  flex flex-col items-center justify-around font-Playfiar sm:text-md md:text-xl lg:text-sm">
            <p className="w-full flex items-center justify-center gap-5">
              <span>WHATSAPP NO :</span>
              <span> {student.whatsapp_no}</span>
              <FaPhoneSquareAlt color="green" />
            </p>

            <p className="w-full border-black flex items-center justify-center gap-5 ">
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
      <div className="rightdiv min-h-[92vh] sm:w-full lg:w-[65%]  flex flex-col lg:gap-10 sm:p-1 md:p-3 lg:py-2 lg:px-0  xl:p-10">
        {!openViewReports ? (
          <>
            <div className="descDiv basis-1/2 font-enriq sm:text-xl md:text-2xl lg:text-md w-full  rounded-3xl lg:p-10 sm:p-3 md:p-5 flex flex-col gap-2 shadow-2xl">
              <span className="flex flex-row border-b-[1px] border-gray-400">
                <p>Father's Name </p>&nbsp;:&nbsp;<p>{student.father}</p>
              </span>
              <span className="flex flex-row border-b-[1px] border-gray-400">
                <p>Mother's Name </p>&nbsp;:&nbsp;
                <p>
                  {student.mother?.length === 0 ? "Not Given" : student.mother}
                </p>
              </span>
              <span className="flex flex-row border-b-[1px] border-gray-400">
                <p>Address </p>&nbsp;:&nbsp;
                <p>{student.address}</p>
              </span>
              <span className="flex flex-row  border-b-[1px] border-gray-400">
                <p>PinCode </p>&nbsp;:&nbsp;
                <p>
                  {student.pin_code?.length === 0
                    ? "Not Given"
                    : student.pin_code}
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
                <p>School Location </p>&nbsp;:&nbsp;
                <p>{student.school_location}</p>
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
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
