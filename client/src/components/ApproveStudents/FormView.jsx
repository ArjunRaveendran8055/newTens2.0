import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  Option,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import socket from "../../socket";
import { allStates } from "./statesdistricts";
import compressImage from "browser-image-compression";
import allSyllabus from "./syllabus.json";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToastView } from "../features/toast/toastSlice";
import { countries } from "./countries";
import { IoIosAddCircleOutline } from "react-icons/io";

const districtsInKerala = [
  "Others",
  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thiruvananthapuram",
  "Thrissur",
  "Wayanad",
];

const FormView = ({
  formData,
  setFormData,
  imageUrl,
  setImageUrl,
  photo,
  setPhoto,
  errors,
  setErrors,
  schools,
  setSchools,
  isOpen,
  setIsOpen,
  selectedSchool,
  setSelectedSchool,
  syllabus,
  setSyllabus,
  statesIn,
  setStatesIn,
  levels,
  setLevels,
  classList,
  setClassList,
  districtsIn,
  setDistrictsIn,
  allCentre,
  setIsUpdatedMsg,
  setOpenPreview,
  setSelectedIndex,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [actualSchool, setActualSchool] = useState("");
  const [isAddSchool, setIsAddSchool] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [schoolData, setSchoolData] = useState({
    title: "",
    syllabus: "",
    location: "",
    district: "",
    state: "kerala",
  });
  const [isClassDropdownVisible, setIsClassDropdownVisible] = useState(false);
  const [isLevelDropdownVisible, setIsLevelDropdownVisible] = useState(false);
  const [isCountryDropdownVisible, setIsCountryDropdownVisible] =
    useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isStateDropdownVisible, setIsStateDropdownVisible] = useState(false);
  const [isDistDropdownVisible, setIsDistDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const ClassDropdownRef = useRef(null);
  const levelDropdonwRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const distDropdownRef = useRef(null);

  //check the mouse is clicked outside levels list
  const LevelListClickOutside = (event) => {
    if (
      levelDropdonwRef.current &&
      !levelDropdonwRef.current.contains(event.target)
    ) {
      setIsLevelDropdownVisible(false);
    }
  };

  //check the mouse is clicked outside class list
  const ClassListClickOutside = (event) => {
    if (
      ClassDropdownRef.current &&
      !ClassDropdownRef.current.contains(event.target)
    ) {
      setIsClassDropdownVisible(false);
    }
  };

  //check the mouse is clicked outside state list
  const CountryListClickOutside = (event) => {
    if (
      countryDropdownRef.current &&
      !countryDropdownRef.current.contains(event.target)
    ) {
      setIsCountryDropdownVisible(false);
    }
  };

  //check the mouse is clicked outside state list
  const StateListClickOutside = (event) => {
    if (
      stateDropdownRef.current &&
      !stateDropdownRef.current.contains(event.target)
    ) {
      setIsStateDropdownVisible(false);
    }
  };

  //check the mouse is clicked outside district list
  const DistListClickOutside = (event) => {
    if (
      distDropdownRef.current &&
      !distDropdownRef.current.contains(event.target)
    ) {
      setIsDistDropdownVisible(false);
    }
  };

  //check the mouse is clicked outside class list
  useEffect(() => {
    document.addEventListener("mousedown", LevelListClickOutside);
    document.addEventListener("mousedown", ClassListClickOutside);
    document.addEventListener("mousedown", CountryListClickOutside);
    document.addEventListener("mousedown", StateListClickOutside);
    document.addEventListener("mousedown", DistListClickOutside);
    return () => {
      document.removeEventListener("mousedown", LevelListClickOutside);
      document.removeEventListener("mousedown", ClassListClickOutside);
      document.removeEventListener("mousedown", CountryListClickOutside);
      document.removeEventListener("mousedown", StateListClickOutside);
      document.removeEventListener("mousedown", DistListClickOutside);
    };
  }, []);

  const fetchLevels = () => {
    const levels = allSyllabus
      .find((item) => item.syllabus === formData.syllabus)
      .levels.map((item) => item.level);
    //console.log("levels are", levels);
    setLevels([...levels]);
  };

  const fetchClassList = () => {
    if (formData.level !== null) {
      const levels = allSyllabus.find(
        (item) => item.syllabus === formData.syllabus
      ).levels;
      const classes = levels.find(
        (level) => level.level === formData.level
      ).classes;
      // Use a Set to track unique class identifiers
      const uniqueClasses = Array.from(
        new Set(classes.map((cls) => JSON.stringify(cls)))
      ).map((cls) => JSON.parse(cls));
      //console.log("classes are: ", uniqueClasses);
      setClassList([...uniqueClasses]);
    }
  };

  //useEffect to fetch Level of educations and Classes for dropDown

  useEffect(() => {
    fetchLevels();
    fetchClassList();
  }, [formData.syllabus, formData.level]);

  //function to fetch all the states
  const fetchStates = () => {
    if (formData.country !== "india") {
      setStatesIn(["others"]);
    } else {
      const states = allStates.map((item) => item.state);
      //console.log("states are: ", states);
      setStatesIn([...states]);
    }
  };

  //function to fetch districts base on the stateOpted

  const fetchAllDists = () => {
    if (formData.state != "others" && formData.state.length > 0) {
      const dists = allStates.find(
        (data) => data.state.toLowerCase() === formData.state.toLowerCase()
      ).districts;
      return setDistrictsIn([...dists]);
    }
  };

  //useEffect to fetch states and Districts for dropDown

  useEffect(() => {
    fetchStates();
    fetchAllDists();
  }, [formData.country, formData.state]);

  const handleLevelButtonClick = () => {
    setIsLevelDropdownVisible((prev) => !prev);
  };

  const handleClassButtonClick = () => {
    setIsClassDropdownVisible((prev) => !prev);
  };

  const handleCountryBtnClick = () => {
    setIsCountryDropdownVisible((prev) => !prev);
  };

  const handleStateBtnClick = () => {
    setIsStateDropdownVisible((prev) => !prev);
  };

  const handleDistBtnClick = () => {
    setIsDistDropdownVisible((prev) => !prev);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    try {
      const compressedFile = await compressImage(file, {
        maxSizeMB: 0.25, // Maximum size in megabytes
        maxWidthOrHeight: 900, // Maximum width or height
        useWebWorker: true, // Use web workers for faster compression (optional)
      });

      // Now you can use the compressedFile for further processing or uploading
      console.log("Compressed image:", compressedFile);
      setPhoto(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //function to handle changes in all the fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("error in name is", errors[name]);
    setErrors({ ...errors, [name]: "" });
    console.log(name, value);
    if (name === "level") {
      return setFormData({ ...formData, class: null, [name]: value });
    }

    if (name === "syllabus")
      return setFormData({
        ...formData,
        level: null,
        class: null,
        syllabus: value,
      });
    if (name === "state") {
      console.log("tutututututututut...");
      return setFormData({ ...formData, district: "", state: value });
    }
    if (name === "country" && value === "india") {
      return setFormData({
        ...formData,
        district: "",
        state: "",
        country: value,
      });
    }
    if (name === "country" && value !== "india") {
      return setFormData({
        ...formData,
        district: "others",
        state: "others",
        country: value,
      });
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //function for validating form
  const validateForm = () => {
    console.log("centre is", formData.centre);
    const newErrors = {};
    if (!formData.centre) newErrors.centre = "Centre is required";
    //if (!photo) newErrors.photo = "photo is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.pinCode) {
      newErrors.pinCode = "Pin code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Pin code must be 6 digits";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.class) newErrors.class = "Class is required";
    if (!formData.syllabus) newErrors.syllabus = "Syllabus is required";
    if (!formData.school) newErrors.school = "School is required";
    if (!formData.schoolLocation)
      newErrors.schoolLocation = "School location is required";
    if (!formData.medium) newErrors.medium = "Medium is required";
    if (!formData.country) newErrors.country = "country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.fatherName)
      newErrors.fatherName = "Father's name is required";
    if (!formData.motherName)
      newErrors.motherName = "Mother's name is required";
    if (!formData.fatherOccupation)
      newErrors.fatherOccupation = "Father's occupation is required";
    if (!formData.motherOccupation)
      newErrors.motherOccupation = "Mother's occupation is required";
    if (!formData.rollNumber) newErrors.rollNumber = "Roll number is required";
    else if (!/^[a-zA-Z]{2}\d{3}$/.test(formData.rollNumber)) {
      newErrors.rollNumber =
        "Roll number must start with 2 alphabetic characters followed by 3 digits example - AB001";
    }
    if (!formData.fatherNumber) {
      newErrors.fatherNumber = "Father's number is required";
    } else if (!/^\d{10}$/.test(formData.fatherNumber)) {
      newErrors.fatherNumber = "Father's number must be 10 digits";
    }
    if (!formData.motherNumber) {
      newErrors.motherNumber = "Mother's number is required";
    } else if (!/^\d{10}$/.test(formData.motherNumber)) {
      newErrors.motherNumber = "Mother's number must be 10 digits";
    }
    if (!formData.whatsappNumber) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "WhatsApp number must be 10 digits";
    }
    setErrors(newErrors);
    console.log("errors are:", newErrors);
    return newErrors;
  };

  const scrollToElement = (name) => {
    console.log("Name of element is:", name);

    // Retrieve the element by its name attribute
    const elements = document.getElementsByName(name);
    console.log("Elements found:", elements);

    if (elements.length > 0) {
      const element = elements[0];

      // Scroll to the calculated position smoothly
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Optionally, focus the element to highlight it
      element.focus();
    } else {
      console.error("Element not found:", name);
    }
  };

  //dialog open controller

  const HandleOpenDialog = () => {
    setDialog((cur) => !cur);
  };

  const fetchSchools = (scl) => {
    axios
      .post("/registration/getschool", {
        syllabus: formData.syllabus,
        search: scl,
      })
      .then((response) => {
        console.log("schools are", response.data.data);
        setSchools([...response.data.data]);
        setIsAddSchool(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsOpen(false);
        setSchools([]);
        setErrors({ ...errors, school: "School Not found" });
        setIsAddSchool(true);
      });
  };

  const handleSchoolChange = (schoolName) => {
    setErrors({ ...errors, school: "", schoolLocation: "" });
    console.log("entered school name:", schoolName.length);
    setActualSchool(schoolName || "");
    if (schoolName.length > 3) {
      setIsOpen(true);
      fetchSchools(schoolName);
    } else {
      setIsOpen(false);
      setIsAddSchool(false);
      setFormData({
        ...formData,
        school: "",
        schoolLocation: "",
      });
    }
  };

  console.log("actualSchool value:", actualSchool);

  const handleSchoolChange2 = (school) => {
    console.log("selected school is", school.name, school.loc);
    setErrors({ ...errors, schools: "" });
    setFormData({
      ...formData,
      school: school.name,
      schoolLocation: school.loc,
    });
    setActualSchool(school.name || "");
    setIsOpen(false);
  };

  //code realted to add school

  const validateSchoolForm = () => {
    const errors = {};
    const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only letters and spaces

    if (!schoolData.title.trim()) {
      errors.title = "School Title is required";
    } else if (!regex.test(schoolData.title)) {
      errors.title =
        "School Title cannot contain numbers or special characters";
    }

    if (!schoolData.syllabus.trim()) {
      errors.syllabus = "Syllabus is required";
    } else if (!regex.test(schoolData.syllabus)) {
      errors.syllabus = "Syllabus cannot contain numbers or special characters";
    }

    if (!schoolData.location.trim()) {
      errors.location = "Location is required";
    } else if (!regex.test(schoolData.location)) {
      errors.location = "Location cannot contain numbers or special characters";
    }

    if (!schoolData.district.trim()) {
      errors.district = "District is required";
    } else if (!regex.test(schoolData.district)) {
      errors.district = "District cannot contain numbers or special characters";
    }

    setFormErrors(errors);

    // Return true if no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update the schoolData state
    setSchoolData({
      ...schoolData,
      [id]: value,
    });

    // Clear the error for the specific field being edited
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: "",
      });
    }
  };

  const handleSyllabusChange = (value) => {
    // Update the syllabus in schoolData
    setSchoolData({
      ...schoolData,
      syllabus: value,
    });

    // Clear the syllabus error if it exists
    if (formErrors.syllabus) {
      setFormErrors({
        ...formErrors,
        syllabus: "",
      });
    }
  };
  //handle change distict || state
  const handleSelectChange = (field, value) => {
    console.log("balu is:", value);
    setSchoolData({
      ...schoolData,
      [field]: value,
    });
    if (formErrors.district) {
      setFormErrors({
        ...formErrors,
        district: "",
      });
    }
  };
  console.log("school data is:", schoolData);

  const handleSchoolSave = () => {
    if (validateSchoolForm()) {
      axios
        .post("/school/addSchool", { schoolData })
        .then((res) => {
          setDialog(false);
          setActualSchool("");
          setSchoolData({
            title: "",
            syllabus: "",
            location: "",
            district: "",
            state: "kerala",
          });
        })
        .catch((err) => {
          dispatch(
            setToastView({ type: "error", msg: err.response.data.error })
          );
        });
    }
  };

  //code realted to add school end here//

  const preSubmissionHandle = async () => {
    console.log("duttuttu...");
    let errs = validateForm();
    console.log(errs);
    if (Object.keys(errs).length > 0) {
      scrollToElement(Object.keys(errs)[0]);
    }
    if (Object.entries(errs).length == 0) {
      setIsModalOpen(true);
    }
  };

  const handleSub = async () => {
    if (!photo) {
      console.log("dum...dum..");
      setIsSaving(true);
      axios
        .post("/approve/staffApproval", { formData })
        .then((res) => {
          const { id } = res.data;
          console.log("response is :",res.data)
          console.log("ithanne alle angod ayache", id);
          setIsModalOpen(false);
          setIsSaving(false);
          setOpenPreview(false);
          setSelectedIndex(null);
          setIsUpdatedMsg(true);
          setTimeout(() => setIsUpdatedMsg(false), 3000);
          socket.emit("student-updated", { id });
          const {mailSend}=res.data
          if(!mailSend){
            return dispatch(setToastView({type:"error",msg:"Mail limit Exceeded!"}))
          }
        })
        .catch((err) => {
          setIsModalOpen(false);
          setIsSaving(false);
          err.response.data.error;
          dispatch(
            setToastView({ msg: err.response.data.error, type: "error" })
          );
        });
    } else {
      setIsSaving(true);
      const finalFormData = new FormData();
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const strFormData = JSON.stringify(formData);
      finalFormData.append("file", photo);
      finalFormData.append("formData", strFormData);
      axios
        .post("/approve/staffApprovalWithPhoto", finalFormData, config)
        .then((res) => {
          const { id } = res.data;
          console.log("response is:",res.data)
          console.log("ithanne alle angod ayache", id);
          setIsModalOpen(false);
          setIsSaving(false);
          setOpenPreview(false);
          setSelectedIndex(null);
          setIsUpdatedMsg(true);
          setTimeout(() => setIsUpdatedMsg(false), 3000);
          socket.emit("student-updated", { id });
          const {mailSend}=res.data
          if(!mailSend){
            return dispatch(setToastView({type:"error",msg:"Mail limit Exceeded!"}))
          }
        })
        .catch((err) => {
          setIsModalOpen(false);
          setIsSaving(false);
          err.response.data.error;
          dispatch(
            setToastView({ msg: err.response.data.error, type: "error" })
          );
        });
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto  p-4 bg-white rounded-lg shadow-lg">
        <div className="mt-6 space-y-4">
          <div className="w-52 p-2 mx-auto  rounded">
            <label name="photo" htmlFor="imageUpload" className="">
              <div className="avatar-upload relative rounded-full bg-gray-200">
                <div className="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className=" px-2 py-1 absolute ml-36  mt-40 inline-block w-9 h-9 bg-white rounded-full border border-gray-300 shadow cursor-pointer  hover:bg-gray-100"
                  >
                    <i className="fas fa-camera fa-lg text-gray-600 "></i>
                  </label>
                </div>
                <div className="avatar-preview">
                  <div
                    id="imagePreview"
                    className="w-48 h-48 bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                </div>
              </div>
            </label>
            {errors.photo && (
              <span className="text-sm text-red-500">
                {" * " + errors.photo}
              </span>
            )}
          </div>

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="full-name">
              Full Name
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="full-name"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />

              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {" * " + errors.fullName}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Gender
            </label>
            <div className="flex flex-col w-full">
              <Select
                className="border-gray-200 border-[1px]"
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  handleInputChange({ target: { name: "gender", value: e } })
                }
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
              {errors.gender && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.gender}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="address"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <span className="text-sm  text-red-500">
                {" * " + errors.address}
              </span>
            )}
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              PinCode
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="pin-code"
                placeholder="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
              />
              {errors.pinCode && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.pinCode}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Date of Birth
            </label>
            <div className="flex flex-col w-full">
              <input
                type="date"
                placeholder="Date Of Birth"
                id="dob"
                className="h-10 w-full   rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.dob}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Email
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                placeholder="Enter your email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Syllabus
            </label>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <Select
                  value={formData.syllabus}
                  className="border-gray-200 border-[1px]"
                  name="syllabus"
                  onChange={(e) => {
                    setSyllabus(e);
                    handleInputChange({
                      target: { name: "syllabus", value: e },
                    });
                  }}
                >
                  <Option value="state">STATE</Option>
                  <Option value="cbse">CBSE</Option>
                </Select>
              </div>
              {errors.syllabus && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.syllabus}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="gender" name="level">
              Level of Education
            </label>
            <div className="flex flex-col w-full text-[12px]">
              <button
                ref={levelDropdonwRef}
                onClick={handleLevelButtonClick}
                value={formData.level}
                className={`relative w-full h-10 border-[1px] border-gray-500  rounded-md ${
                  isLevelDropdownVisible &&
                  "rounded-b-none border-b-0 border-gray-700  "
                } flex px-4 py-2`}
              >
                {formData.level}
                <div
                  className={`classlists transition-scale duration-150 ${
                    isLevelDropdownVisible
                      ? "scale-100 opacity-100"
                      : "sr-only scale-90 opacity-75"
                  } flex absolute bg-white w-full top-12 z-20 right-0 rounded-md border-[1px] border-gray-200 flex-col px-2 py-2 shadow-md`}
                >
                  {levels
                    ?.filter((item) => item !== formData.level)
                    .map((item, key) => (
                      <span
                        className="bg-white w-full flex px-2 py-2 hover:bg-gray-200 rounded-md"
                        key={key}
                        value={item}
                        onClick={(e) => {
                          handleInputChange({
                            target: { name: "level", value: item },
                          });
                        }}
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </button>
              {errors.level && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.class}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="gender">
              Class
            </label>
            <div name="class" className="flex flex-col w-full">
              <button
                ref={ClassDropdownRef}
                onClick={handleClassButtonClick}
                value={formData.class}
                className={`relative w-full h-10 border-[1px] border-gray-500  rounded-md ${
                  isClassDropdownVisible &&
                  "rounded-b-none border-b-0 border-gray-700 "
                } flex px-4 py-2`}
              >
                {formData.class !== null ? `Class ${formData.class}` : ``}
                <div
                  className={`classlists transition-scale duration-150 ${
                    isClassDropdownVisible
                      ? "scale-100 opacity-100"
                      : "sr-only scale-90 opacity-75"
                  } flex absolute bg-white w-full top-12 z-20 right-0 rounded-md border-[1px] border-gray-200 flex-col px-2 py-2 shadow-md`}
                >
                  {classList
                    ?.filter(
                      (item) => parseInt(item.cls) !== parseInt(formData.class)
                    )
                    .map((item, key) => (
                      <span
                        className="bg-white w-full flex px-2 py-2 hover:bg-gray-200 rounded-md"
                        key={key}
                        onClick={() =>
                          handleInputChange({
                            target: { name: "class", value: item.cls },
                          })
                        }
                        value={item.cls + ""}
                      >
                        {item.txt}
                      </span>
                    ))}
                </div>
              </button>
              {errors.class && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.class}
                </span>
              )}
            </div>
          </div>

          {/* //onEdit */}
          <div className="">
            <div className="">
              <div className="  rounded  relative">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="school"
                  >
                    Entered School Name :
                  </label>
                  <div
                    name="schoolName"
                    className="flex justify-center shadow uppercase appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="schoolName"
                  >
                    <span>{selectedSchool}</span>
                  </div>
                </div>
              </div>

              {/* </Stack> */}
            </div>
          </div>

          <Dialog
            open={dialog}
            handler={() => setDialog(false)}
            size="md"
            className="p-4 rounded-lg capitalize"
          >
            <DialogHeader className="text-xl font-semibold text-center">
              Add School
            </DialogHeader>
            <DialogBody divider className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="schoolTitle"
                  className="text-gray-700 text-sm font-medium"
                >
                  School Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter the school title..."
                  value={schoolData.title}
                  onChange={handleChange}
                  className="border capitalize border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.title && (
                  <span className="text-red-500 text-xs">
                    {formErrors.title}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="syllabus"
                  className="text-gray-700 text-sm font-medium"
                >
                  Syllabus
                </label>
                <Select
                  id="syllabus"
                  value={schoolData.syllabus}
                  onChange={handleSyllabusChange}
                >
                  <Option value="state">STATE</Option>
                  <Option value="cbse">CBSE</Option>
                </Select>
                {formErrors.syllabus && (
                  <span className="text-red-500 text-xs">
                    {formErrors.syllabus}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-gray-700 text-sm font-medium"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Enter the specific location..."
                  value={schoolData.location}
                  onChange={handleChange}
                  className="border capitalize border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.location && (
                  <span className="text-red-500 text-xs">
                    {formErrors.location}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="district"
                  className="text-gray-700 text-sm font-medium"
                >
                  District
                </label>
                <Select
                  id="district"
                  value={schoolData.district}
                  onChange={(value) => handleSelectChange("district", value)}
                >
                  {districtsInKerala.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
                {formErrors.district && (
                  <span className="text-red-500 text-xs">
                    {formErrors.district}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="state"
                  className="text-gray-700 text-sm font-medium"
                >
                  State
                </label>
                <Select
                  id="state"
                  value={schoolData.state}
                  onChange={(value) => handleSelectChange("state", value)}
                >
                  <Option value="kerala">Kerala</Option>
                  <Option value="others">Others</Option>
                </Select>
                {formErrors.state && (
                  <span className="text-red-500 text-xs">
                    {formErrors.state}
                  </span>
                )}
              </div>
            </DialogBody>
            <DialogFooter className="flex justify-center gap-4">
              <button
                className="bg-gray-200 text-gray-700 rounded px-4 py-2 hover:bg-gray-300"
                onClick={() => setDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                onClick={handleSchoolSave}
              >
                Save Report
              </button>
            </DialogFooter>
          </Dialog>

          <div className="">
            <div className="">
              <div className="  rounded  relative">
                <div className="mb-4">
                  <div className="w-full flex justify-between items-end">
                    <label
                      className="block whitespace-nowrap text-gray-700 text-sm font-bold mb-2"
                      htmlFor="school"
                    >
                      Select Actual School
                    </label>
                    {isAddSchool && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={HandleOpenDialog}
                          className="flex mb-2 justify-center items-center gap-2 px-2 py-1 border rounded-md bg-red-500"
                        >
                          <span>Add</span>
                          <IoIosAddCircleOutline size={25} />{" "}
                        </Button>
                      </div>
                    )}
                  </div>
                  <input
                    className="shadow uppercase appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="input"
                    placeholder="Search for your school"
                    // Open the school list on input focus
                    onChange={(event) => handleSchoolChange(event.target.value)}
                    value={actualSchool || ""} //setting fallBack value
                  />
                  {errors.school && (
                    <span className="text-sm  text-red-500">
                      {" * " + errors.school}
                    </span>
                  )}
                </div>
                {isOpen && (
                  <ul className="border rounded uppercase border-gray-300 overflow-y-auto max-h-40 absolute top-full left-0 right-0 z-10 bg-white">
                    {schools?.map((school, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                          selectedSchool === school.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          handleSchoolChange2({
                            name: school.name,
                            loc: school.location,
                          });
                        }}
                      >
                        {school.name + " " + school.location}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* </Stack> */}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              School Location
            </label>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <input
                  disabled={true}
                  name="schoolLocation"
                  className="flex uppercase h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="school-location"
                  placeholder="School location"
                  value={formData.schoolLocation}
                  onChange={handleInputChange}
                />
                {errors.schoolLocation && (
                  <span className="text-sm  text-red-500">
                    {" * " + errors.schoolLocation}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Medium
            </label>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <Select
                  className="border-gray-200 border-[1px]"
                  value={formData.medium}
                  name="medium"
                  onChange={(e) =>
                    handleInputChange({ target: { name: "medium", value: e } })
                  }
                >
                  <Option value="english">English</Option>
                  <Option value="malayalam">Malayalam</Option>
                </Select>
                {errors.medium && (
                  <span className="text-sm  text-red-500">
                    {" * " + errors.medium}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* //country */}

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="gender">
              Country
            </label>
            <div className="flex flex-col w-full">
              <button
                ref={countryDropdownRef}
                onClick={handleCountryBtnClick}
                value={formData.country}
                className={`relative w-full h-10 border-[1px] border-gray-500  rounded-md ${
                  isCountryDropdownVisible &&
                  "rounded-b-none border-b-0 border-gray-700 "
                } flex px-4 py-2`}
              >
                {formData.country}
                <div
                  className={`classlists transition-scale duration-150 h-[25vh] overflow-y-scroll ${
                    isCountryDropdownVisible
                      ? "scale-100 opacity-100"
                      : "sr-only scale-90 opacity-75"
                  } flex absolute bg-white w-full top-12 z-20 right-0 rounded-md border-[1px] border-gray-200 flex-col px-2 py-2 shadow-md`}
                >
                  {countries
                    ?.filter(
                      (item) =>
                        item.value.toLowerCase() !==
                        formData.country.toLowerCase()
                    )
                    .map((item, key) => (
                      <span
                        className="bg-white w-full flex px-2 py-2 hover:bg-gray-200 rounded-md"
                        key={key}
                        onClick={() =>
                          handleInputChange({
                            target: { name: "country", value: item.value },
                          })
                        }
                        value={item.value}
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
              </button>
              {errors.country && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.country}
                </span>
              )}
            </div>
          </div>

          {/* //country */}

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="gender">
              State
            </label>
            <div className="flex flex-col w-full">
              <button
                ref={stateDropdownRef}
                onClick={handleStateBtnClick}
                disabled={formData.country !== "india"}
                value={formData.state}
                className={`relative w-full h-10 border-[1px] border-gray-500  rounded-md ${
                  isStateDropdownVisible &&
                  "rounded-b-none border-b-0 border-gray-700 "
                } flex px-4 py-2`}
              >
                {formData.state}
                <div
                  className={`classlists transition-scale duration-150 max-h-[25vh] ${
                    statesIn.length > 1
                      ? "overflow-y-scroll"
                      : "overflow-y-hidden"
                  } ${
                    isStateDropdownVisible
                      ? "scale-100 opacity-100"
                      : "sr-only scale-90 opacity-75"
                  } flex absolute bg-white w-full top-12 z-20 right-0 rounded-md border-[1px] border-gray-200 flex-col px-2 py-2 shadow-md`}
                >
                  {statesIn
                    ?.filter(
                      (item) =>
                        item.toLowerCase() !== formData.state.toLowerCase()
                    )
                    .map((item, key) => (
                      <span
                        className="bg-white w-full flex px-2 py-2 hover:bg-gray-200 rounded-md"
                        key={key}
                        onClick={() =>
                          handleInputChange({
                            target: { name: "state", value: item },
                          })
                        }
                        value={item}
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </button>
              {errors.state && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.state}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <label className="flex w-full" htmlFor="gender">
              Districts
            </label>
            <div className="flex flex-col w-full">
              <button
                disabled={
                  formData.country !== "india" || formData.state.length === 0
                }
                ref={distDropdownRef}
                onClick={handleDistBtnClick}
                value={formData.district}
                className={`relative w-full h-10 border-[1px] border-gray-500  rounded-md ${
                  isDistDropdownVisible &&
                  "rounded-b-none border-b-0 border-gray-700 "
                } flex px-4 py-2`}
              >
                {formData.district}
                <div
                  className={`classlists transition-scale duration-150 h-[25vh] overflow-y-scroll ${
                    isDistDropdownVisible
                      ? "scale-100 opacity-100"
                      : "sr-only scale-90 opacity-75"
                  } flex absolute bg-white w-full top-12 z-20 right-0 rounded-md border-[1px] border-gray-200 flex-col px-2 py-2 shadow-md`}
                >
                  {districtsIn
                    ?.filter(
                      (item) =>
                        item.toLowerCase() !== formData.district.toLowerCase()
                    )
                    .map((item, key) => (
                      <span
                        className="bg-white w-full flex px-2 py-2 hover:bg-gray-200 rounded-md"
                        key={key}
                        onClick={() =>
                          handleInputChange({
                            target: { name: "district", value: item },
                          })
                        }
                        value={item}
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </button>
              {errors.district && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.district}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Father's Name
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="father-name"
                placeholder="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
              {errors.fatherName && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.fatherName}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Mother's Name
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mother-name"
                placeholder="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
              {errors.motherName && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.motherName}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Father's Occupation
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="father-occupation"
                placeholder="Father's Occupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
              />
              {errors.fatherOccupation && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.fatherOccupation}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Mother's Occupation
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mother-occupation"
                placeholder="Mother's Occupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
              />
              {errors.motherOccupation && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.motherOccupation}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Roll Number
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="roll-number"
                placeholder="Assign Roll Number (5 digit)"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
              />
              {errors.rollNumber && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.rollNumber}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Father's Number
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="father-number"
                placeholder="Father's Number"
                name="fatherNumber"
                value={formData.fatherNumber}
                onChange={handleInputChange}
              />
              {errors.fatherNumber && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.fatherNumber}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Mother's Number
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mother-number"
                placeholder="Mother's Number"
                name="motherNumber"
                value={formData.motherNumber}
                onChange={handleInputChange}
              />
              {errors.motherNumber && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.motherNumber}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Whatsapp Number
            </label>
            <div className="flex flex-col w-full">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="whatsapp-number"
                placeholder="Whatsapp Number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
              />
              {errors.whatsappNumber && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.whatsappNumber}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <label className="flex w-full" htmlFor="gender">
              Centre
            </label>
            <div className="flex flex-col w-full">
              <div className="w-full">
                <Select
                  className="border-gray-200 border-[1px]"
                  value={formData.centre}
                  name="centre"
                  onChange={(e) =>
                    handleInputChange({ target: { name: "centre", value: e } })
                  }
                >
                  {allCentre.map((item, key) => (
                    <Option key={key} value={item.centre}>
                      {item.centre}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.centre && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.centre}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={preSubmissionHandle} className="mt-5">
              Register
            </Button>
          </div>
        </div>
        {isModalOpen && (
          <div
            className={` fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50`}
          >
            <div className="bg-white w-100 h-100 rounded-lg p-6">
              <h2 className="text-xl mb-4">Approve Confirmation</h2>
              <p className="uppercase">
                You sure want to Approve "{formData.rollNumber}" ?{" "}
              </p>
              <div className="flex justify-end mt-4">
                {!isSaving ? (
                  <button
                    onClick={handleSub}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                  >
                    Yes, Confirm
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
                  >
                    <span className=" animate-pulse">Updating..</span>
                  </button>
                )}

                <button
                  disabled={isSaving}
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="bg-gray-300 px-4 py-2 rounded cursor-pointer"
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FormView;
