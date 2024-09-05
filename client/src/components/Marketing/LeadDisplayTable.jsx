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
import { FaTimes } from "react-icons/fa";
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSyllabus, setSelectedSyllabus] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
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
  
  const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasargod"
  ];
  const classes = ["7", "8", "9", "10", "11", "12"];
  const syllabi = ["cbse", "state"];
  const country = ["india", "usa", "quatar"];

  const fetchLocations = async (searchText) => {
    try {
      const response = await axios.get(`/school/locations?q=${searchText}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions", error);
    }
  };

  const handleSuggestionClick = (location) => {
    setSelectedLocation(location);
    setQuery(location);
    setSuggestions([]); // Hide suggestions after selecting one
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      fetchLocations(value);
    } else {
      setSuggestions([]);
      setSelectedLocation("")
    }
  };

  

  const fetchLeadList = () => {
    axios
      .get(
        `/leadBank/getAllLeads?page=${currentPage}&limit=${itemsPerPage}&dateFrom=${dateFrom}&dateTo=${dateTo}&syllabus=${selectedSyllabus}&className=${selectedClass}&district=${selectedDistrict}&location=${selectedLocation}`
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
  }, [dateFrom, dateTo, currentPage,selectedSyllabus,selectedClass,selectedDistrict,selectedLocation]);

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

  const handleExportClick = () => {
    setIsPopupVisible(true);
  };



  const handleClosePopup = () => {
    setIsPopupVisible(false);
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

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

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
        `/leadbank/exportleads?dateFrom=${dateFrom}&dateTo=${dateTo}&syllabus=${selectedSyllabus}&className=${selectedClass}&district=${selectedDistrict}&location=${selectedLocation}`,
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
            <span className="LeadDetailsandExportDiv gap-5 w-full flex items-center">
              <Button
                className="flex sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-7 lg:h-10 text-white"
                // onClick={onExport}
                onClick={handleExportClick}
              >
                <span>Export</span>
              </Button>
              <Button
              onClick={toggleOverlay}
                className="flex sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-7 lg:h-10 text-white"
              >
                <span>Sort Data</span>
              </Button>
            </span>
            
          </div>
        </CardHeader>

        {isPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Export Options</h2>
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
            <div className="flex justify-between items-center">
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
            <Button
                className="flex sm:gap-1 lg:gap-2 justify-center items-center bg-black sm:w-20 lg:w-32 sm:h-7 lg:h-10 text-white"
                 onClick={onExport}
                
              >
                <span>Download</span>
              </Button>
              </div>
          </div>
        </div>
      )}

        <div className="w-full flex justify-around px-4 sm:gap-5 lg:gap-0">
          <div className="w-1/2 flex sm:justify-end lg:justify-start items-center">
            <DatePicker
              id="date"
              onChange={dateFromChangeHandler}
              selected={dateFrom}
              dateFormat="dd/MM/yyyy"
              className="border ml-4 sm:w-32 sm:h-7 lg:w-32 lg:h-10 flex justify-center items-center px-4 rounded-md"
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
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg mt-4">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap bg-gray shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gradient-to-r from-gray-900 to-gray-900 text-white">
                    <tr className="text-md sm:text-sm font-semibold whitespace-nowrap tracking-wide text-left uppercase border-b border-gray-200">
                    {tableHeadings.map((el, key) => (
                      <th key={key} align="center" className="px-4 py-3"> {el}</th>
                    ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {leadList.map((item, key) => {
                     return (
              <tr key={key} className="hover:bg-gray-100">
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.name}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.class}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.year}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.division}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.phone}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.whatsapp}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.syllabus}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-xs text-black w-96">  {/* Added w-40 for wider width */}
    {item.school}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.location}
  </td>
  <td align="center" className="px-4 uppercase py-3 border-t border-gray-200 text-m sm:text-sm text-black">
    {item.district}
  </td>
</tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>

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

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${isOverlayOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <button
          className="absolute top-4 right-4 text-black"
          onClick={toggleOverlay}
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sort Data</h2>

          {/* Syllabus Dropdown */}
          <div className="mb-4">
            <label htmlFor="syllabus" className="block text-sm font-medium text-gray-700">
              Syllabus
            </label>
            <select
              id="syllabus"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedSyllabus}
              onChange={(e) => setSelectedSyllabus(e.target.value)}
            >
              <option value="">Select Syllabus</option>
              {syllabi.map((syllabus, index) => (
                <option key={index} value={syllabus}>
                  {syllabus.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Class Dropdown */}
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              id="class"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>


          {/* Country Dropdown */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {country.map((country, index) => (
                <option key={index} value={country}>
                  {country.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="mb-4">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>

      {/* location search */}

          <div className="mb-4">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <input
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        type="search"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search location"
      />
      {suggestions.length > 0 && (
        <ul className="border bg-white mt-1 rounded-md shadow-lg">
          {suggestions.map((location, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSuggestionClick(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
 
        </div>
      </div>
    </div>
  );
};

export default LeadDisplayTable;
