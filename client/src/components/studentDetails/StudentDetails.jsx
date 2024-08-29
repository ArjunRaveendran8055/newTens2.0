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
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  BookOpenIcon,
  MapIcon,
  UserIcon,
  GraduationCapIcon,
  BookmarkIcon,
} from "lucide-react";
import { SsrReportView } from "./ssrReportView/SsrReportView";
import { SERVER_URL } from "../../server";

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
  const [activeTab, setActiveTab] = useState("info");

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
  console.log("student is :", student);

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
        handledBy: `${user.firstname + " " + user.lastname}`,
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

      <div className="w-full bg-gray-100 sm:pt-2 lg:pt-5 h-screen">
        <div className="w-full mx-auto flex flex-col h-screen bg-red-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1 bg-gradient-to-br from-white to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-6 text-center capitalize">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  STUDENT DETAILS
                </h2>
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border shadow-lg mb-4">
                  <img
                    src={`${SERVER_URL}/uploads/students/${student.image}`}
                    alt="Student"
                    className="w-full h-full object-cover hover:contrast-75 transition-all duration-150"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 capitalize">
                  {student.student_name}
                </h2>
                <p className="text-gray-600 mb-1 capitalize">
                  Class: {student.class} | Roll: {student.roll_no}
                </p>
                <p className="text-gray-600 mb-4">Center: {student.centre}</p>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 px-4 py-2 rounded-md">
                    Add Report
                  </button>
                  <button className="text-blue-500 border border-blue-500 hover:bg-blue-50 transition-colors duration-200 px-4 py-2 rounded-md">
                    View Reports
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-6 capitalize">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Student Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoItem
                    icon={<UserIcon className="w-5 h-5 text-blue-500" />}
                    label="Father's Name"
                    value="purushothaman t k"
                  />
                  <InfoItem
                    icon={<UserIcon className="w-5 h-5 text-blue-500" />}
                    label="Mother's Name"
                    value="sumathi t p"
                  />
                  <InfoItem
                    icon={<MapPinIcon className="w-5 h-5 text-blue-500" />}
                    label="Address"
                    value="thundiyil house, cherai p o, cherai"
                  />
                  <InfoItem
                    icon={
                      <GraduationCapIcon className="w-5 h-5 text-blue-500" />
                    }
                    label="Pin Code"
                    value="683521"
                  />
                  <InfoItem
                    icon={<BookOpenIcon className="w-5 h-5 text-blue-500" />}
                    label="Syllabus"
                    value="cbse"
                  />
                  <InfoItem
                    icon={<BookmarkIcon className="w-5 h-5 text-blue-500" />}
                    label="Medium"
                    value="english"
                  />
                  <InfoItem
                    label="School Name"
                    value="raja rajeswari central school"
                  />
                  <InfoItem
                    icon={<MapIcon className="w-5 h-5 text-blue-500" />}
                    label="School Location"
                    value="kodukulanji"
                  />
                  <InfoItem
                    icon={<MapPinIcon className="w-5 h-5 text-blue-500" />}
                    label="District"
                    value="bengaluru (bangalore) urban"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="block lg:hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {["info", "contact"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab === "info" ? "Student Info" : "Contact Details"}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-4">
              {activeTab === "info" ? (
                <MobileInfoCard />
              ) : (
                <MobileContactCard />
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Contact Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InfoItem
                    icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
                    label="WhatsApp No"
                    value="Not provided"
                  />
                  <InfoItem
                    icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
                    label="Father's No"
                    value="9497678645"
                  />
                  <InfoItem
                    icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
                    label="Mother's No"
                    value="9992225551"
                  />
                  <InfoItem
                    icon={<MailIcon className="w-5 h-5 text-blue-500" />}
                    label="Email ID"
                    value="No content for email id."
                    className="sm:col-span-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* view Report div */}
    </div>
  );
};

function MobileInfoCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 gap-4">
        <InfoItem
          icon={<UserIcon className="w-5 h-5 text-blue-500" />}
          label="Father's Name"
          value="purushothaman t k"
        />
        <InfoItem
          icon={<UserIcon className="w-5 h-5 text-blue-500" />}
          label="Mother's Name"
          value="sumathi t p"
        />
        <InfoItem
          icon={<MapPinIcon className="w-5 h-5 text-blue-500" />}
          label="Address"
          value="thundiyil house, cherai p o, cherai"
        />
        <InfoItem
          icon={<GraduationCapIcon className="w-5 h-5 text-blue-500" />}
          label="Pin Code"
          value="683521"
        />
        <InfoItem
          icon={<BookOpenIcon className="w-5 h-5 text-blue-500" />}
          label="Syllabus"
          value="cbse"
        />
        <InfoItem
          icon={<BookmarkIcon className="w-5 h-5 text-blue-500" />}
          label="Medium"
          value="english"
        />
        <InfoItem label="School Name" value="raja rajeswari central school" />
        <InfoItem
          icon={<MapIcon className="w-5 h-5 text-blue-500" />}
          label="School Location"
          value="kodukulanji"
        />
        <InfoItem
          icon={<MapPinIcon className="w-5 h-5 text-blue-500" />}
          label="District"
          value="bengaluru (bangalore) urban"
        />
      </div>
    </div>
  );
}

function MobileContactCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-1 gap-4">
        <InfoItem
          icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
          label="WhatsApp No"
          value="Not provided"
        />
        <InfoItem
          icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
          label="Father's No"
          value="9497678645"
        />
        <InfoItem
          icon={<PhoneIcon className="w-5 h-5 text-blue-500" />}
          label="Mother's No"
          value="9992225551"
        />
        <InfoItem
          icon={<MailIcon className="w-5 h-5 text-blue-500" />}
          label="Email ID"
          value="No content for email id."
        />
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, className = "" }) {
  return (
    <div
      className={`flex items-center space-x-3 group p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 ${className}`}
    >
      <div className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
          {label}
        </p>
        <p className="text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default StudentDetails;
