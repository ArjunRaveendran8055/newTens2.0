import React, { useEffect, useState, useCallback } from "react";
import { Select, Option, Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import allStates from "./statesdistricts.json";
import addImg from "./addimg.png";
import Logo from "./logo.png";
import compressImage from "browser-image-compression";
import allSyllabus from "./syllabus.json";
import { useNavigate } from "react-router-dom";
import {debounce} from "lodash";

const RegForm = () => {

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(addImg);

 

  const [photo, setPhoto] = useState(null);

  const [errors, setErrors] = useState({});


  const requiredKeys = ['idd', 'name', 'class', 'school'];

  const standardizeObjects = (arr, keys, defaultValue = null) => {
    return arr.map(obj => {
      const standardizedObj = {};
      keys.forEach(key => {
        standardizedObj[key] = obj[key] !== undefined ? obj[key] : defaultValue;
      });
      return standardizedObj;
    });
  }


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

  const [siblingsList, setsiblingsList] = useState([]);

  const sibHandle = (name, i, val) => {
    const newItem = { idd: i, [name]: val };

    const index = siblingsList.findIndex((item) => item.idd === i);

    let updatedList = [...siblingsList];

    if (index !== -1) {
      updatedList[index] = { ...updatedList[index], [name]: val };
    } else {
      updatedList.push(newItem);
    }

    let finalList = standardizeObjects([...updatedList], requiredKeys);

    console.log(finalList)

    setFormData({
      ...formData,
      siblings: finalList,
    });

    setsiblingsList(finalList);
  };

  const [syllabus, setSyllabus] = useState("");


  const [statesIn, setStatesIn] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    address: "",
    pinCode: "",
    dob: "",
    email: "",
    class: "",
    syllabus: "",
    level: "",
    school: "",
    schoolLocation: "",
    medium: "",
    country: "",
    state: "",
    district: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    motherOccupation: "",
    rollNumber: "",
    fatherNumber: "",
    motherNumber: "",
    whatsappNumber: "",
    centre: "sd",
    academicStatus: "",
    hearAbout: "",
    difficultSubjects: [],
    siblings: [],
  });

  const validateForm = () => {
    const newErrors = {};

    if (!photo) newErrors.photo = "photo is required";
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
    } else if (!/^\d{6,15}$/.test(formData.fatherNumber)) {
      newErrors.fatherNumber = "Father's number must be between 6 and 15 digits";
    }
    
    if (!formData.motherNumber) {
      newErrors.motherNumber = "Mother's number is required";
    } else if (!/^\d{6,15}$/.test(formData.motherNumber)) {
      newErrors.motherNumber = "Mother's number must be between 6 and 15 digits";
    }
    
    if (!formData.whatsappNumber) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{6,15}$/.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "WhatsApp number must be between 6 and 15 digits";
    }
    
    if (!formData.academicStatus)
      newErrors.academicStatus = "Academic status is required";
    if (!formData.hearAbout)
      newErrors.hearAbout = "Please specify how you heard about us";

    setErrors(newErrors);

    return newErrors;
  };

  const [schools, setSchools] = useState([]);

  const [formFlag , setFormFlag] = useState(false);

  const [siblingsCount, setSiblingsCount] = useState("0");

  const [isOpen, setIsOpen] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState([]);

  


  const fetchSchool = async (scl) => {
    if (scl.length > 2) {
      try {
        const response = await axios.post("/registration/getschool", { syllabus: syllabus, search: scl });
        if (response) {
          console.log(response.data.data);
          setSchools([...response.data.data]);
        } else  {
          console.log(response.data.data, "sds");
          setSchools([]);
        }
      } catch (error) {
        console.log(error);
        setSchools([]);
      }
    } else {
      setSchools([]);
    }
  };
  
  const debouncedFetchSchool = useCallback(debounce(fetchSchool, 300), []);
  
  useEffect(() => {
    console.log(addImg);
    console.log(fetchDistricts(statesIn));
  
    debouncedFetchSchool(selectedSchool);
  
    return () => {
      debouncedFetchSchool.cancel(); // Cancel any pending debounced calls
    };
  }, [formData.syllabus, selectedSchool]);


  useEffect(() => {
    if(formFlag==true){
      validateForm()
    }
    console.log(formData)
    
    
  }, [formData, photo]);

  const scrollToElement = (name) => {
    const element = document.getElementsByName(name);

    if (element) {
      const offset = -250; // Adjust this value to scroll a bit above
      const topPos =
        element[0].getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };

  const handleSub = async () => {

    const formDataLast = new FormData();

    formDataLast.set("data", JSON.stringify(formData));

    
    formDataLast.set("image", photo);

    setFormFlag(true)
    let errs = validateForm();
    console.log(errs);

    if (Object.keys(errs).length > 0) {
      scrollToElement(Object.keys(errs)[0]);
    }

    if (Object.entries(errs).length == 0) {
      await axios
        .post("/registration/submitStudent", formDataLast)
        .then((response) => {
          console.log("submitted successfully:", response.data);
          console.log(response.data.data, "aiii")
          navigate(`/SubmitSuccess/${response.data.data.responseId}`)

        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
        });
    }
  };

  const handleSchoolChange = (schoolName) => {
    console.log(schoolName);

    setSelectedSchool(schoolName.toLowerCase());
    setIsOpen(true); // Close the school list after selection
    // Set the selected school in the input field

    setFormData({
      ...formData,
      school: schoolName.toLowerCase(),
    });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const isChecked = formData.difficultSubjects.includes(value);

    let updatedSubjects = [...formData.difficultSubjects];
    if (isChecked) {
      updatedSubjects = updatedSubjects.filter((subject) => subject !== value);
    } else {
      updatedSubjects.push(value);
    }

    console.log(updatedSubjects);
    setFormData({
      ...formData,
      difficultSubjects: updatedSubjects,
    });
  };

  const handleSchoolChange2 = (schoolName) => {
    console.log(schoolName);

    setSelectedSchool(schoolName.toLowerCase());

    setFormData({
      ...formData,
      school: schoolName.toLowerCase(),
    });

    setIsOpen(false); // Close the school list after selection
    // Set the selected school in the input field
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if(name=='country' && value!= 'india'){
      setFormData({
        ...formData,
        [name]: value,
        state: "others",
        district: "others",
      });
    }else if(name=='country' && value== 'india'){

      setFormData({
        ...formData,
        [name]: value,
        state: "",
        district: "",
      });
    }
    else{
      setFormData({
        ...formData,
        [name]: value,
      });
    }

   
  };

  const fetchDistricts = (state) => {
    let final = [];

    let Data = allStates.states.find((value) => {
      if (value.state == state) {
        return value.districts;
      }
    });

    if (Data) {
      final = Data.districts;
    }

    return final;
  };

  const [levels, setLevels] = useState([]);

  const [classList, setClassList] = useState([]);

  const fetchLevel = (syll) => {

    console.log(syll)
    let datas = allSyllabus.find((data) => data.syllabus == syll);

    console.log(datas)

    if (datas)
      setLevels(datas.levels);

  };



  const fetchClassList = (cls) => {

    console.log(cls)
    let datas = levels.find((data) => data.level == cls);

    console.log(datas.classes)

    if (datas)
      setClassList(datas.classes);

  };

  useEffect(() => {
    fetchLevel(formData.syllabus);
    if (formData.level) {
      fetchClassList(formData.level)
    }

  }, [formData.syllabus, formData.level]);




  return (
    <>
      <div className="flex flex-col border-[1px] border-black sm:border-none items-center justify-center mb-10 max-w-4xl font-sans text-lg md:font-serif mx-auto sm:mt-0 lg:mt-5 p-4 bg-white rounded-xl shadow-2xl">
        <div className="flex items-center justify-center flex-col gap-5">
          <img src={Logo} alt="" style={{ height: "70px" }} />
          <h2 className="text-2xl font-bold">
            <i className="fa-solid fa-graduation-cap mr-3"></i>
            Student Registration Form
          </h2>
        </div>
        <form className="mt-6 space-y-4 mb-5">
          <div name="photo" className="w-52 p-2 mx-auto mb-10 rounded ">
            <label htmlFor="imageUpload">
              <div className="avatar-upload">
                <div className="avatar-edit">
                  <input
                    required
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
                    className="w-48 h-48 bg-cover bg-center rounded-full border-4 border-gray-300"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                  {errors.photo && (
                    <span className="text-sm text-center text-red-500">
                      {" * " + errors.photo}
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                className="flex capitalize h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

            <div>
              <label htmlFor="gender">Gender</label>

              <div className="w-50">
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    handleInputChange({ target: { name: "gender", value: e } })
                  }
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </div>
              {errors.gender && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.gender}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div></div>
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              className="flex capitalize h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <label htmlFor="pin-code">Pin Code</label>
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

            <div>
              <label htmlFor="dob">Date Of Birth</label>
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

            <div></div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="syllabus">Syllabus</label>
              <div className="w-50">
                <Select
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

            <div>
              <label htmlFor="class">Level Of Education</label>
              <div className="w-50">
                <Select
                  name="level"
                  disabled={!formData.syllabus}
                  onChange={(e) =>
                    handleInputChange({ target: { name: "level", value: e } })
                  }
                >
                  {/*  value={formData.class}  onChange={(e)=>handleInputChange({target:{name:"class",value:e}})} */}
                  {levels?.map((data, i) => (
                    <Option key={i} value={data.level}>
                      {data.txt}
                    </Option>
                  ))}
                </Select>
              </div>
              {/* {errors.class && <span className="text-sm  text-red-500">{" * "+ errors.class}</span>} */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="class">Class</label>
              <div className="w-50">
                <Select
                  name="class"
                  disabled={!formData.level}
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: "class", value: parseInt(e) },
                    })
                  }
                >
                  {classList?.map((data, i) => (
                    <Option key={i} value={data.cls + ""}>
                      {data.txt}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.class && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.class}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <div className="w-50 uppercase">
                <Select
                  value={formData.country}
                  name="country"
                  onChange={(e) =>
                    handleInputChange({ target: { name: "country", value: e } })
                  }
                >
                  <Option value="india">India</Option>
                  <Option value="dubai">Dubai</Option>
                  <Option value="bahrain">Bahrain</Option>
                  <Option value="kuwait">Kuwait</Option>
                  <Option value="oman">Oman</Option>
                  <Option value="qatar">Qatar</Option>
                  <Option value="saudiarabia">Saudi Arabia</Option>
                  <Option value="uae">United Arab Emirates</Option>
                </Select>
              </div>
              {errors.country && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.country}
                </span>
              )}
            </div>
          </div>

          <div className="">
            <div className="">
              <div className="  rounded  relative">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="school"
                  >
                    Select Your School
                  </label>
                  <input
                    name="school"
                    className="shadow uppercase appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="school"
                    type="search"
                    placeholder="Search for your school"
                    // Open the school list on input focus
                    onChange={(event) => handleSchoolChange(event.target.value)}
                    value={selectedSchool}
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
                          handleSchoolChange2(
                            school.name + " " + school.location
                          );

                          handleInputChange({
                            target: {
                              name: "schoolLocation",
                              value: school.location,
                            },
                          });

                          setFormData({
                            ...formData,
                            school: school.name + " " + school.location,
                            schoolLocation: school.location,
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="school-location">School Location</label>
              <input
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

            <div>
              <label htmlFor="medium">Medium</label>
              <div className="w-50 uppercase">
                <Select
                  value={formData.medium}
                  name="medium"
                  onChange={(e) =>
                    handleInputChange({ target: { name: "medium", value: e } })
                  }
                >
                  <Option value="english">English</Option>
                  <Option value="malayalam">Malayalam</Option>
                </Select>
              </div>
              {errors.medium && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.medium}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state">State</label>
              <div className="w-50">
                <Select
                  disabled={formData.country!="india"}
                  name="state"
                  onChange={(e) => {
                    setStatesIn(e);
                    handleInputChange({ target: { name: "state", value: e } });
                  }}
                  placeholder="State"
                >
                  {allStates?.states?.map((value, index) => (
                    <Option key={index} value={value.state}>
                      {value.state}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.state && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.state}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="district">District</label>
              <div className="w-50">
                <Select
                  name="district"
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: "district", value: e },
                    })
                  }
                  disabled={!statesIn}
                  placeholder="State"
                >
                  {fetchDistricts(statesIn).map((value, index) => (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.district && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.district}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="father-name">Father's Name</label>
              <input
                className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div>
              <label htmlFor="mother-name">Mother's Name</label>
              <input
                className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="father-occupation">Father's Occupation</label>
              <input
                className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div>
              <label htmlFor="mother-occupation">Mother's Occupation</label>
              <input
                className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

          <div>
            <label htmlFor="roll-number">Roll Number</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="father-number">Father's Number</label>
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
            <div>
              <label htmlFor="mother-number">Mother's Number</label>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="whatsapp-number">Whatsapp Number</label>
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
            <div>
              <label htmlFor="centre">Centre</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="centre"
                placeholder="Assiged Accordingly"
                name="centre"
                disabled
                value={formData.centre}
                onChange={handleInputChange}
              />
              {errors.centre && (
                <span className="text-sm  text-red-500">
                  {" * " + errors.centre}
                </span>
              )}
            </div>
          </div>

          <div className="sibilingparent border-2 p-4 gap border-blue-gray-200 rounded-md">
            <div className="grid grid-cols-2">
              <div>
                <label htmlFor="class">Number of Siblings</label>
                <div className="w-30">
                  <Select
                    value={siblingsCount}
                    onChange={(event) => setSiblingsCount(event)}
                  >
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </div>
              </div>
            </div>

            {[...Array(parseInt(siblingsCount))].map((value, index) => {
              return (
                <div
                  key={index}
                  className="siblings border-4 rounded-lg p-4 mt-3 "
                >
                  <div className="bottom-2">
                    <div className="grid grid-cols-2  gap-4">
                      <div>
                        <label htmlFor="siblingname">Name</label>
                        <input
                          className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingname"
                          placeholder="Enter Name of Sibling"
                          onChange={(e) =>
                            sibHandle("name", index, e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="siblingage">Class</label>
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingclass"
                          placeholder="enter class"
                          onChange={(e) =>
                            sibHandle("class", index, e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1  gap-4">
                      <div>
                        <label htmlFor="siblingschool">School</label>
                        <input
                          className="flex h-10 w-full capitalize rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingschool"
                          placeholder="Enter School Name"
                          onChange={(e) =>
                            sibHandle("school", index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="space-y-2">
              <label className="block text-lg font-medium underline mb-5">
                Academic Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Below Average"
                  />
                  <span className="ml-2 text-lg">Below Average</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Average"
                  />
                  <span className="ml-2 text-lg">Average</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Good"
                  />
                  <span className="ml-2 text-lg">Good</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Excellent"
                  />
                  <span className="ml-2 text-lg">Excellent</span>
                </label>
              </div>
            </div>
            {errors.academicStatus && (
              <span className="text-sm text-red-500">
                {" * " + errors.academicStatus}
              </span>
            )}
          </div>

          <div>
            <div className="space-y-2">
              <label className="block text-lg font-medium underline mb-5">
                How did you hear about new10s?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="calling executive"
                  />
                  <span className="ml-2 text-lg">Calling Executive</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="Marketing Executive"
                  />
                  <span className="ml-2 text-lg">Marketing Executive</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="relatives"
                  />
                  <span className="ml-2 text-lg">Relatives</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="social-media"
                  />
                  <span className="ml-2 text-lg">Social Media</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="friends"
                  />
                  <span className="ml-2 text-lg">Friends</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="others"
                  />
                  <span className="ml-2 text-lg">Others</span>
                </label>
              </div>
            </div>
            {errors.hearAbout && (
              <span className="text-sm  text-red-500">
                {" * " + errors.hearAbout}
              </span>
            )}


            
          </div>

          

          <div>
            <div className="space-y-2">
              <label className="block text-lg font-medium underline">
                Difficult Subjects
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Maths"
                  />
                  <span className="ml-2 text-lg">Maths</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="English"
                  />
                  <span className="ml-2 text-lg">English</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Malayalam"
                  />
                  <span className="ml-2 text-lg">Malayalam</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Hindi"
                  />
                  <span className="ml-2 text-lg">Hindi</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Physics"
                  />
                  <span className="ml-2 text-lg">Physics</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Chemistry"
                  />
                  <span className="ml-2 text-lg">Chemistry</span>
                </label>
                <label className="flex items-center">
                  <input
                    onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Biology"
                  />
                  <span className="ml-2 text-lg">Biology</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-5">
            <Button onClick={handleSub} className="mt-5">
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegForm;
