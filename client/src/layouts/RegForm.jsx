import React, { useEffect, useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import axios from "axios";
import allStates from "./statesdistricts.json"
import addImg from './addimg.jpg'

const RegForm = () => {




  const [imageUrl, setImageUrl] = useState(addImg);

  const handleImageChange = (e) => {
    const file = e.target.files[0];  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    school: "",
    schoolLocation: "",
    medium: "",
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
    centre: "",
    academicStatus: "",
    hearAbout: "",
    difficultSubjects: [],
    siblings: [],
  });





 
  const [schools, setSchools] = useState([]);

  
  const [siblingsCount, setSiblingsCount] = useState("0");
  


  const [isOpen, setIsOpen] = useState(false);


  const [selectedSchool, setSelectedSchool] = useState([]);

 
  
  useEffect(() => {

    console.log(addImg)
    console.log(fetchDistricts(statesIn))
    const fetchSchool =  async (scl) => {
      
      

         if(scl.length>2){
        
        
         await axios
        .post('/registration/getschool',{syllabus:syllabus,search:scl})
        .then((response) => {
          
          console.log(response.data.data);
          setSchools([...response.data.data])
          

         
        })
        .catch((error) => console.log(error));

      

      }else{
        setSchools([])
      }
        
    
    
    
    };


    fetchSchool(selectedSchool)

  }, [formData.syllabus,selectedSchool]);

  const handleSub = () =>{
    console.log(formData)
  }

  const handleSchoolChange = (schoolName) => {
    console.log(schoolName)
    
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

    console.log(updatedSubjects)
    setFormData({
      ...formData,
      difficultSubjects: updatedSubjects,
    });
  };


  const handleSchoolChange2 = (schoolName) => {
    console.log(schoolName)
    
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  

  const fetchDistricts = (state) => {

    let final = []

    let Data = allStates.states.find((value) => {
      if (value.state == state) {
        return value.districts;
      }

    });

    if(Data){
       final = Data.districts
    }

    return final;
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <form className="mt-6 space-y-4">
          <label htmlFor="imageUpload">
            <div className="w-52 p-2 mx-auto  rounded ">
              <div className="avatar-upload">
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
            </div>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="full-name"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>

              <div className="w-50">
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={(e)=>handleInputChange({target:{name:"gender",value:e}})}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div></div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="class">Class</label>
              <div className="w-50">
                <Select name="class" value={formData.class}  onChange={(e)=>handleInputChange({target:{name:"class",value:e}})} >
                  <Option value="8">Class 8</Option>
                  <Option value="9">Class 9</Option>
                  <Option value="10">Class 10</Option>
                  <Option value="11">Class 11</Option>
                  <Option value="12">Class 12</Option>
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="syllabus">Syllabus</label>
              <div className="w-50">
                <Select name="syllabus" onChange={(e) => {  setSyllabus(e) ; handleInputChange({target:{name:"syllabus",value:e}}) } }>
                  <Option value="state">STATE</Option>
                  <Option value="cbse">CBSE</Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="">
            <div>
              <label htmlFor="school">School</label>
              {/* <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="school"
                    placeholder="School"
                  /> */}

              {/* <Autocomplete
           
              disableClearable
              id="school"
              className=" rounded-md border-none bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              options={top100Films}
              sx={{ width: "100%" ,
                               }}
              renderInput={(params) => <TextField  {...params} label="Select Your School" />}
            /> */}

              {/* <Stack spacing={2} sx={{ width: "100%" }}> */}

              <div className=" rounded  relative">
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
                </div>
                {isOpen && (
                  <ul className="border rounded uppercase border-gray-300 overflow-y-auto max-h-40 absolute top-full left-0 right-0 z-10 bg-white">
                    {schools?.map((school, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                          selectedSchool === school.name ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>{
                           handleSchoolChange2(
                            school.name + " " + school.location
                          )

                          handleInputChange({target:{name:"schoolLocation",value:school.location}})
                        }
                         
                        }
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
            </div>

          

            <div>
              <label htmlFor="medium">Medium</label>
              <div className="w-50 uppercase">
                <Select value={formData.medium} name="medium" onChange={(e)=>handleInputChange({target:{name:"medium",value:e}})}>
                  <Option value="english">English</Option>
                  <Option value="malayalam">Malayalam</Option>
                </Select>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state">State</label>
              <div className="w-50">
                <Select name="state" onChange={(e) => { setStatesIn(e); handleInputChange({target:{name:"state",value:e}}) } } placeholder="State">
                  {allStates?.states?.map((value, index) => (
                    <Option key={index} value={value.state}>
                      {value.state}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label htmlFor="district">District</label>
              <div className="w-50">
                <Select name="district"    onChange={(e)=>handleInputChange({target:{name:"district",value:e}})} disabled={!statesIn} placeholder="State">
                  {fetchDistricts(statesIn).map((value, index) => (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="father-name">Father's Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="father-name"
                placeholder="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="mother-name">Mother's Name</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mother-name"
                placeholder="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="father-occupation">Father's Occupation</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="father-occupation"
                placeholder="Father's Occupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="mother-occupation">Mother's Occupation</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="mother-occupation"
                placeholder="Mother's Occupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="roll-number">Assign Roll Number (5 digit)</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="roll-number"
              placeholder="Assign Roll Number (5 digit)"
              name="rollNumber"
              value={formData.rollNumber}
                onChange={handleInputChange}
            />
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
            </div>
            <div>
              <label htmlFor="centre">Centre</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="centre"
                placeholder="Centre"
                name="centre"
                value={formData.centre}
                onChange={handleInputChange}
              />
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
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingname"
                          placeholder="Enter Name of Sibling"
                        />
                      </div>
                      <div>
                        <label htmlFor="siblingage">Class</label>
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingclass"
                          placeholder="enter class"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1  gap-4">
                      <div>
                        <label htmlFor="siblingschool">School</label>
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          id="siblingschool"
                          placeholder="Enter School Name"
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
              <label className="block text-sm font-medium text-gray-700">
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
                  <span className="ml-2 text-sm text-gray-900">
                    Below Average
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Average"
                  />
                  <span className="ml-2 text-sm text-gray-900">Average</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Good"
                  />
                  <span className="ml-2 text-sm text-gray-900">Good</span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="academicStatus"
                    value="Excellent"
                  />
                  <span className="ml-2 text-sm text-gray-900">Excellent</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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
                  <span className="ml-2 text-sm text-gray-900">
                    Calling Executive
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="contact method"
                    value="hearAbout"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Marketing Executive
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                     onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="relatives"
                  />
                  <span className="ml-2 text-sm text-gray-900">Relatives</span>
                </label>
                <label className="flex items-center">
                  <input
                       onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="social-media"
                  />
                  <span className="ml-2 text-sm text-gray-900">
                    Social Media
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                       onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="friends"
                  />
                  <span className="ml-2 text-sm text-gray-900">Friends</span>
                </label>
                <label className="flex items-center">
                  <input
                       onChange={handleInputChange}
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600"
                    name="hearAbout"
                    value="others"
                  />
                  <span className="ml-2 text-sm text-gray-900">Others</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
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
                  <span className="ml-2 text-sm text-gray-900">Maths</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="English"
                  />
                  <span className="ml-2 text-sm text-gray-900">English</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Malayalam"
                  />
                  <span className="ml-2 text-sm text-gray-900">Malayalam</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Hindi"
                  />
                  <span className="ml-2 text-sm text-gray-900">Hindi</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Physics"
                  />
                  <span className="ml-2 text-sm text-gray-900">Physics</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Chemistry"
                  />
                  <span className="ml-2 text-sm text-gray-900">Chemistry</span>
                </label>
                <label className="flex items-center">
                  <input
                  onClick={handleCheckboxChange}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    value="Biology"
                  />
                  <span className="ml-2 text-sm text-gray-900">Biology</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleSub} className="mt-5">Register</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegForm;
