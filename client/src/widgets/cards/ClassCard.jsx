import React from 'react'
import classLogo from '/customImages/class-logo.png'

function ClassCard(item) {

// Extracting time in 12-hour format
const classDate = new Date(item.classDetail.classdate);
const hours = classDate.getHours();
const minutes = classDate.getMinutes();
const meridiem = hours >= 12 ? 'PM' : 'AM';
const hour12 = hours % 12 || 12; // Convert to 12-hour format

const time12HourFormat = `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${meridiem}`;

// console.log(time12HourFormat); // Output the time in 12-hour format

  return (
    <>
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg cursor-pointer">
    
    <span className=" bg-white rounded-full ml-6 text-teal-500 text-xs font-bold justify-between px-3 mt-3 py-2 leading-none flex w-[80%] items-center">
            <p>{classDate.toLocaleDateString()}</p>
           <p className='text-red-500'>{item.classDetail.classexam? "Exam" : "No Exam"}</p> 
          </span>
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: "0.1" }}
      >
        <rect
          x="159.52"
          y={175}
          width={152}
          height={152}
          rx={8}
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width={152}
          height={152}
          rx={8}
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div
          className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
          style={{
            background: "radial-gradient(black, transparent 60%)",
            transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
            opacity: "0.2"
          }}
        ></div>
        <img
          className="relative w-40"
          src={classLogo}
          alt=""
        />
      </div>
      <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">{item.classDetail.classsyllabus}</span>
        <div className="flex justify-between">
          <span className="block font-semibold text-xl">{item.classDetail.classname}TH</span>
          <span className=" bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
            {time12HourFormat}
          </span>
        </div>
  
        <div className="flex flex-col">
          <span className="block font-semibold pacity-80 text-l">Tutor: {item.classDetail.tutorname?.name}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default ClassCard