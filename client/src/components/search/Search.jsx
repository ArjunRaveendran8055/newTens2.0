import React, { useEffect, useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import boyIcon from "/icons/boyIcon.png";
import girlIcon from "/icons/girlIcon.png";
import { PiStudentBold } from "react-icons/pi";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdPhoneAndroid } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom"
import SkeletonStudent from "../../widgets/skeletonLoading/SkeletonStudentSearch";

function Search() {
  const [roll, setRoll] = useState("");
  const [no, setNo] = useState("");
  const [name, setName] = useState("");
  const [input, setInput] = useState({
    type: "text",
    placeholder: "roll number..",
    value: "roll",
  });
  const [studentList, setStudentList] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const inputChangeHandler = (e) => {
    if (input.value === "roll") {
      setName("");
      setNo("");
      return setRoll(e.target.value);
    }
    if (input.value === "name") {
      setNo("");
      setRoll("");
      return setName(e.target.value);
    }
    setRoll("");
    setName("");
    return setNo(e.target.value);
  };

  //Api to fetch students according to the search string
  const searchStudents = () => {
    setIsLoading(true);
    axios
      .get(`/student/getAllStudents?roll=${roll}&name=${name}&phno=${no}`)
      .then((res) => {
        //console.log(res.data.data);
        setNoUsers(false);
        setStudentList(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setNoUsers(true);
        setStudentList([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (roll.length >= 3 || no.length >= 3 || name.length >= 3) {
      searchStudents();
    } else {
      setNoUsers(false);
      setStudentList([]);
    }
  }, [roll, no, name]);

  //function to set selected student details
  const selectHandler = (student) => { };

  return (
    <div>
      {/* search box here */}
      <div className="flex flex-col items-center justify-center sm:py-2 lg:p-5">
        <div className="option-container p-2  w-full">
          <span className=" font-Playfiar">Search By:</span>
          <div className="md:w-96">
            <Tabs value="app">
              <TabsHeader>
                <Tab
                  value="app"
                  className="sm:text-sm lg:text-xl "
                  onClick={() => {
                    setInput({
                      type: "text",
                      placeholder: "Roll..",
                      value: "roll",
                    }),
                      setStudentList([]);
                  }}
                >
                  <AiOutlineFieldNumber className="-mt-1 mr-2 inline-block h-5 w-5" />
                  Roll
                </Tab>
                <Tab
                  value="message"
                  className="sm:text-sm lg:text-xl"
                  onClick={() => {
                    setInput({
                      type: "text",
                      placeholder: "Name..",
                      value: "name",
                    }),
                      setStudentList([]);
                  }}
                >
                  <PiStudentBold className="-mt-0.5 sm:mr-1 lg:mr-2 inline-block h-5 w-5" />
                  Name
                </Tab>
                <Tab
                  value="settings"
                  className="sm:text-sm lg:text-xl"
                  onClick={() => {
                    setInput({
                      type: "number",
                      placeholder: "Ph No..",
                      value: "phno",
                    }),
                      setStudentList([]);
                  }}
                >
                  <MdPhoneAndroid className="-mt-1 mr-2 inline-block h-5 w-5" />
                  PhNo
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>
        </div>

        <div className="rounded-lg p-5 ">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              >
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
              </svg>
            </div>
            <input
              type={input.type}
              className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
              placeholder={`Enter ${input.placeholder}`}
              id=""
              onChange={inputChangeHandler}
            />
            <button
              type="button"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* search box ends here.. */}
      <div className="min-h-screen">
        {studentList.length !== 0 ? (
          <div className="mx-auto sm:max-w-[100%] sm:px-1 lg:px-8  lg:py-14 lg:max-w-[95%]">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:pb-2 md:pb-3 lg:pb-5">
              Search Results
            </h2>
            <ul
              role="list"
              className="grid sm:gap-10 lg:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonStudent key={index}/>
                ))
              ) :
                (
                  studentList.map((student) => (
                    <li
                      key={student.roll_no}
                      className="col-span-1 divide-y divide-gray-500 rounded-lg bg-white shadow-lg "
                    >
                      <div className="flex w-full items-center justify-between space-x-6 sm:p-12 lg:p-10">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="truncate text-sm font-medium text-gray-900 uppercase">
                              {student.student_name}
                            </h3>
                          </div>
                          <div className="mt-1 truncate text-md text-gray-700 flex gap-2 w-full px-2 justify-between">
                            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-custdarkblue px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-green-500">
                              {student.roll_no}
                            </span>
                            <p>{student.class}</p>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ring-2 ring-black">
                          <img
                            src={`${student.gender === "FEMALE" ? girlIcon : boyIcon
                              }`}
                            alt=""
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                          <Link className="flex w-0 flex-1 " to={`/search/studentdetails/${student._id}`}>
                            <div
                              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                              onClick={() => {
                                selectHandler(student);
                              }}
                            >
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                              </svg>
                              View
                            </div>
                          </Link>

                          <div className="-ml-px flex w-0 flex-1">
                            <a
                              href="tel:+1-202-555-0170"
                              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                            >
                              <svg
                                className="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Call
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              
              {/* More people... */}
            </ul>
          </div>
        ) : !noUsers ? (
          <div className="sm:text-md lg:text-3xl w-full flex justify-center items-center mt-20">
            <h1>Enter Atleast 3 Characters...</h1>
          </div>
        ) : (
          <div className="text-3xl w-full flex justify-center items-center mt-20">
            <h1>No users Found...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
