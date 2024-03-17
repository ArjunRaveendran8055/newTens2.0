import React from "react";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { RiParentLine } from "react-icons/ri";
const StudentDetails = () => {
  return (
    <div className="bg-whitesmoke flex sm:flex-col lg:flex-row w-full">
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
            <p className=" font-Playfiar">NAME : FAYAZ ABDUL AZEEZ </p>
            <p className="flex gap-5 text-xl  font-sans">
              <span>ClASS : 10TH</span> <span>ROLL : ZA021</span>{" "}
            </p>
            <p>CENTER : ONL </p>
          </div>
          <div className="buttondiv flex items-center justify-center gap-5">
            <button className="px-4 py-2 bg-custblue text-white font-bold rounded-md hover:shadow-custdarkblue hover:shadow-md hover:scale-105 duration-75">
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
              <span> 9446722008</span>
              <FaPhoneSquareAlt color="green" />
            </p>

            <p className="w-full border-black flex items-center justify-center gap-5">
              <span>FATHER'S NO :</span>
              <span> 9497678645</span> <FaPhoneSquareAlt color="green" />
            </p>
            <p className="w-full  border-black flex items-center justify-center gap-5">
              <span>MOTHER'S NO :</span>
              <span> 9497188345</span> <FaPhoneSquareAlt color="green" />
            </p>
            <p className="w-full  border-black flex items-center justify-center gap-5">
              <span>EMAIL ID:</span>
              <span> fayazazeez2@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
      <div className="rightdiv h-[92vh] sm:w-full lg:w-[65%] sm:p-1 md:p-3 lg:p-10 flex flex-col lg:gap-10">
        <div className="descDiv basis-1/2 font-enriq text-xl w-full  rounded-3xl lg:p-10 sm:p-3 md:p-5 flex flex-col gap-2 shadow-2xl">
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Father's Name </p>&nbsp;:&nbsp;<p>Azeez EA</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Mother's Name </p>&nbsp;:&nbsp;<p>Nigar Azeez</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Address </p>&nbsp;:&nbsp;<p>Anchakkalathara House</p>
          </span>
          <span className="flex flex-row  border-b-[1px] border-gray-400">
            <p>PinCode </p>&nbsp;:&nbsp;<p>683521</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Syllabus: </p>&nbsp;:&nbsp;<p>State</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>Medium </p>&nbsp;:&nbsp;<p>English</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>School Name </p>&nbsp;:&nbsp;<p>SNLPS Makkuvalli</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>School Location </p>&nbsp;:&nbsp;<p>Makkuvalli</p>
          </span>
          <span className="flex flex-row border-b-[1px] border-gray-400">
            <p>District </p>&nbsp;:&nbsp;<p>Idukki</p>
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
