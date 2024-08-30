import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { setToastView } from "../features/toast/toastSlice";

const tableHeadings = [
  "name",
  "class",
  "year",
  "division",
  "phone",
  "whatsapp",
  "syllabus",
  "school",
  "location",
  "district",
];

const LeadDisplayTable = ({
  leadList,
  setLeadList,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  itemsPerPage,
  setItemsPerPage,
  noPendingList,
  setNoPendingList,
}) => {
  const dispatch = useDispatch();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fields, setFields] = useState({
    name: 1,
    class: 1,
    year: 1,
    division: 1,
    phone: 1,
    whatsapp: 1,
    syllabus: 1,
    school: 1,
    location: 1,
    district: 1,
  });
  const [checkboxes, setCheckboxes] = useState({
    name: true,
    class: true,
    year: true,
    division: true,
    phone: true,
    whatsapp: true,
    syllabus: true,
    school: true,
    location: true,
    district: true,
  });

  const fetchLeadList = () => {
    axios
      .get(
        `/leadBank/getAllLeads?page=${currentPage}&limit=${itemsPerPage}&dateFrom=${dateFrom}&dateTo=${dateTo}`
      )
      .then((res) => {
        console.log("response is", res.data);
        setLeadList(res.data.leads);
        setTotalPages(res.data.totalPages);
        setNoPendingList(false);
      })
      .catch((err) => {
        console.log("error is", err.response.status);
        if (err.response.status === 404) {
          console.log("tudum..");
          setLeadList([]);
          setNoPendingList(true);
        }
      });
  };

  useEffect(() => {
    fetchLeadList();
  }, [dateFrom, dateTo, currentPage]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: checked,
    }));

    if (checked) {
      setFields({
        ...fields,
        [id]: 1,
      });
    } else {
      setFields({
        ...fields,
        [id]: 0,
      });
    }
  };

  const dateFromChangeHandler = (e) => {
    console.log("event is", e);
    const selectedDate = new Date(e);
    const curDate = new Date();
    if (selectedDate > curDate) {
      return dispatch(
        setToastView({ type: "error", msg: "must be < currDate!" })
      );
    }
    setDateFrom(e);
  };

  const dateToChangeHandler = (e) => {
    const selectedDate = new Date(e);
    console.log(selectedDate, "date");
    const curDate = new Date();
    if (selectedDate > curDate) {
      return dispatch(
        setToastView({ type: "error", msg: "must be < currDate!" })
      );
    }
    if (dateFrom) {
      const startDate = new Date(dateFrom);
      if (selectedDate < startDate) {
        return dispatch(
          setToastView({ type: "error", msg: "must be > startDate" })
        );
      }
    }
    selectedDate.setHours(23);
    selectedDate.setMinutes(59);
    selectedDate.setSeconds(59);
    setDateTo(selectedDate.toString());
  };

  //console.log("fields are:", fields);

  const onExport = () => {

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const today = new Date();

    axios
      .post(
        `/leadbank/exportleads?dateFrom=${dateFrom}&dateTo=${dateTo}`,
        { fields },
        { responseType: "blob" } // Ensure the response is treated as a binary blob
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `leads_${formatDate(today)}_.csv`); // Update filename to CSV
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link); // Clean up after download
      })
      .catch((err) => console.log("Error downloading file:", err));
  };
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader className="mb-2 p-2 shadow-lg">
          <div color="white" className="w-full flex flex-col">
            <span className="LeadDetailsandExportDiv w-full flex justify-between items-center">
              <span className="sm:text-xl lg:text-3xl text-gray-600 font-extrabold">
                Lead Details
              </span>
              <Button
                className="flex sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-7 lg:h-10 text-white"
                onClick={onExport}
              >
                <span>Export</span>
              </Button>
            </span>
            <span className="checkSelectionDiv flex sm:overflow-x-scroll overflow-y-hidden text-black lg:justify-between">
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="name"
                  checked={checkboxes.name}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="name">Name</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="class"
                  checked={checkboxes.class}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="Class">Class</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="year"
                  checked={checkboxes.year}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="Class">Year</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="division"
                  checked={checkboxes.division}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="Division">Division</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="phone"
                  checked={checkboxes.phone}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="Phone">Phone</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="whatsapp"
                  checked={checkboxes.whatsapp}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="WhatsApp">WhatsApp</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="syllabus"
                  checked={checkboxes.syllabus}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="Syllabus">Syllabus</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="school"
                  checked={checkboxes.school}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="School">School</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="location"
                  checked={checkboxes.location}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="location">Location</label>
              </span>
              <span className="flex justify-center items-center">
                <Checkbox
                  color="red"
                  id="district"
                  checked={checkboxes.district}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="District">District</label>
              </span>
            </span>
          </div>
        </CardHeader>
        <div className="w-full flex justify-around px-4 sm:gap-5 lg:gap-0">
          <div className="w-1/2 flex sm:justify-end lg:justify-start">
            <DatePicker
              id="date"
              onChange={dateFromChangeHandler}
              selected={dateFrom}
              dateFormat="dd/MM/yyyy"
              className="border sm:w-32 sm:h-7 lg:w-32 lg:h-10 flex justify-center items-center px-4 rounded-md"
              placeholderText="From"
            />
          </div>

          <div className="w-1/2 flex">
            <DatePicker
              id="date"
              selected={dateTo}
              onChange={dateToChangeHandler}
              dateFormat="dd/MM/yyyy"
              className="border sm:w-32 sm:h-7 lg:w-32 lg:h-10 flex justify-center items-center px-4 rounded-md"
              placeholderText="To"
            />
          </div>
        </div>
        {noPendingList ? (
          <CardBody className="h-[75vh] flex justify-center items-center">
            <span className="text-2xl">No Leads to Show :( </span>
          </CardBody>
        ) : (
          <CardBody className="flex flex-col justify-between min-h-[65vh] overflow-x-scroll px-0 pt-0 pb-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {tableHeadings.map((el, key) => (
                    <th
                      key={key}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <div
                        variant="small"
                        className="text-[11px] font-bold capitalize text-blue-gray-400"
                      >
                        {el}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leadList.map((item, key) => {
                  const className = `py-3 px-5 ${
                    key === leadList.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key} className="capitalize">
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <div
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.class}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.year}
                        </div>
                      </td>
                      <td className={className}>{item.division}</td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.phone}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.whatsapp}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.syllabus}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.school}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.location}
                        </div>
                      </td>
                      <td className={className}>
                        <div className="text-xs font-semibold text-blue-gray-600">
                          {item.district}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>
      <div className="flex w-full flex-row justify-center gap-5">
        <Button
          disabled={currentPage === 1}
          className="py-3 px-5"
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Prev
        </Button>
        <span className="py-2 font-extrabold text-black">
          {currentPage} / {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          className="py-3 px-5"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LeadDisplayTable;
