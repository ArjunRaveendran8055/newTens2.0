import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import axios from "axios";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function SsrReportView({ id }) {
  const [open, setOpen] = React.useState(0);
  const [ssrReport, setSsrReports] = useState([]);
  //useEffect to fetch existing reports
  console.log("id is :", id);
  useEffect(() => {
    axios
      .get(`/student//fetchStudentReports/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setSsrReports(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-indexed
    const year = date.getFullYear().toString().slice(-2); // Getting the last two digits of the year
    return `${day}-${month}-${year}`;
  };
  return (
    <div>
      <div className="descDiv basis-1/2 font-enriq sm:text-xl md:text-2xl lg:text-md w-full  rounded-3xl lg:p-10 sm:p-3 md:p-5 flex flex-col gap-2 shadow-2xl h-[83vh] overflow-y-scroll">
        {ssrReport.length > 0 ? (
          ssrReport?.map((report, key) => (
            <Accordion
              open={open === key + 1}
              icon={<Icon id={key + 1} open={open} />}
              key={key + 1}
            >
              <AccordionHeader onClick={() => handleOpen(key + 1)}>
                <span className=" uppercase flex w-full justify-between items-center">
                  <p className="sm:text-sm md:text-md lg:text-lg">
                    {report.callType}
                  </p>
                  <p className=" text-custgray text-lg lowercase font-thin">
                    Dated On : {formatTimestamp(report.time)}
                  </p>
                </span>
              </AccordionHeader>
              <AccordionBody>
                <div className="w-full flex flex-col gap-2 sm:text-lg">
                  <span>
                    <p className=" underline underline-offset-4 font-bold">
                      Reason
                    </p>
                    <p className=" capitalize font-enriq">{report.reason}</p>
                  </span>
                  <span>
                    <p className="underline underline-offset-4 font-bold">
                      Response
                    </p>
                    <p className=" capitalize font-enriq">{report.response}</p>
                  </span>
                </div>
              </AccordionBody>
            </Accordion>
          ))
        ) : (
          <div className=" capitalize flex w-full items-center justify-center ">
            no reports to show
          </div>
        )}
      </div>
    </div>
  );
}
