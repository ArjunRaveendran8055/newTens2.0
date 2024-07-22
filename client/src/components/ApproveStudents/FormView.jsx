import React, { useEffect, useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import axios from "axios";
import allStates from "../../layouts/statesdistricts.json"
import addImg from '../../layouts/addimg.jpg'
import compressImage from 'browser-image-compression';

const FormView = ({formData,setFormData,selectedSchool,setSelectedSchool,statesIn,setStatesIn,syllabus,setSyllabus,}) => {


  // console.log(statesIn,syllabus,);

  const [imageUrl, setImageUrl] = useState(addImg);

  const formDataLast = new FormData();

  const [photo,setPhoto] = useState(null)

  const [errors, setErrors] = useState({});


  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    try {
      const compressedFile = await compressImage(file, {
        maxSizeMB: 1, // Maximum size in megabytes
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
    
    const index = siblingsList.findIndex(item => item.idd === i);
    
    const updatedList = [...siblingsList];
    
    if (index !== -1) {
        updatedList[index] = { ...updatedList[index], [name]: val };
    } else {
        updatedList.push(newItem);
    }

    setFormData({
      ...formData,
      siblings: updatedList,
    });


    setsiblingsList(updatedList);

}

  




  const validateForm = () => {
    const newErrors = {};

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
    if (!formData.schoolLocation) newErrors.schoolLocation = "School location is required";
    if (!formData.medium) newErrors.medium = "Medium is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required";
    if (!formData.motherName) newErrors.motherName = "Mother's name is required";
    if (!formData.fatherOccupation) newErrors.fatherOccupation = "Father's occupation is required";
    if (!formData.motherOccupation) newErrors.motherOccupation = "Mother's occupation is required";
    if (!formData.rollNumber) newErrors.rollNumber = "Roll number is required";
    else if (!/^[a-zA-Z]{2}\d{3}$/.test(formData.rollNumber)) {
      newErrors.rollNumber = "Roll number must start with 2 alphabetic characters followed by 3 digits example - AB001";
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
    if (!formData.centre) newErrors.centre = "Centre is required";
    if (!formData.academicStatus) newErrors.academicStatus = "Academic status is required";
    if (!formData.hearAbout) newErrors.hearAbout = "Please specify how you heard about us";


    setErrors(newErrors);

    return newErrors
  };



 
  const [schools, setSchools] = useState([]);

  
  const [siblingsCount, setSiblingsCount] = useState("0");
  


  const [isOpen, setIsOpen] = useState(false);


  

 
  
  useEffect(() => {


    //console.log(fetchDistricts(statesIn))
    const fetchSchool =  async (scl) => {
      

         if(scl.length>2){
        
        //  await axios
        // .post('/registration/getschool',{syllabus:syllabus,search:scl})
        // .then((response) => {
          
        //   console.log(response.data.data);
        //   setSchools([...response.data.data])
          

         
        // })
        // .catch((error) => console.log(error));

      

      }else{
        setSchools([])
      }
        
    
    
    
    };


    fetchSchool(selectedSchool)

  }, [formData.syllabus,selectedSchool]);


  useEffect(()=>{
   formDataLast.append('data',JSON.stringify(formData))
    
    formDataLast.append('image', photo)

    

  },[formData,photo])





  const scrollToElement = (name) => {
    const element = document.getElementsByName(name);

    
    if (element) {
      const offset = -250; // Adjust this value to scroll a bit above
      const topPos = element[0].getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: topPos, behavior: "smooth" });
    }
  };



  const handleSub = async () =>{

    

    

    let  errs =  validateForm()
console.log(errs)
    
  if(Object.keys(errs).length>0)
    {
       scrollToElement(Object.keys(errs)[0])
    }
   


   if(Object.entries(errs).length == 0 ){

    await axios.post('/registration/submitStudent', formDataLast )
    .then(response => {
     
      console.log('submitted successfully:', response.data);
    })
    .catch(error => {
     
      console.error('Error submitting form data:', error);
    });

   }
    
   
   
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
                <div className="avatar-edit relative">
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

                {errors.fullName && <span className="text-sm text-red-500">{" * "+ errors.fullName}</span>}
              
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
              {errors.gender && <span className="text-sm  text-red-500">{" * "+ errors.gender}</span>}
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
            {errors.address && <span className="text-sm  text-red-500">{" * "+ errors.address}</span>}
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
              {errors.pinCode && <span className="text-sm  text-red-500">{" * "+ errors.pinCode}</span>}
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
              {errors.dob && <span className="text-sm  text-red-500">{" * "+ errors.dob}</span>}
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
            {errors.email && <span className="text-sm  text-red-500">{" * "+ errors.email}</span>}
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
              {errors.class && <span className="text-sm  text-red-500">{" * "+ errors.class}</span>}
            </div>

            <div>
              <label htmlFor="syllabus">Syllabus</label>
              <div className="w-50">
                <Select name="syllabus" value={syllabus} onChange={(e) => {  setSyllabus(e) ; handleInputChange({target:{name:"syllabus",value:e}}) } }>
                  <Option value="state">STATE</Option>
                  <Option value="cbse">CBSE</Option>
                </Select>
              </div>
              {errors.syllabus && <span className="text-sm  text-red-500">{" * "+ errors.syllabus}</span>}
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
                  {errors.school && <span className="text-sm  text-red-500">{" * "+ errors.school}</span>}
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

                          setFormData({
                            ...formData,
                            school: school.name + " " + school.location,
                            schoolLocation: school.location,
                          });

                      
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
              {errors.schoolLocation && <span className="text-sm  text-red-500">{" * "+ errors.schoolLocation}</span>}
            </div>

          

            <div>
              <label htmlFor="medium">Medium</label>
              <div className="w-50 uppercase">
                <Select value={formData.medium} name="medium" onChange={(e)=>handleInputChange({target:{name:"medium",value:e}})}>
                  <Option value="english">English</Option>
                  <Option value="malayalam">Malayalam</Option>
                </Select>
              </div>
              {errors.medium && <span className="text-sm  text-red-500">{" * "+ errors.medium}</span>}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state">State</label>
              <div className="w-50">
                <Select name="state" value={statesIn} onChange={(e) => { setStatesIn(e); handleInputChange({target:{name:"state",value:e}}) } } placeholder="State">
                  {allStates?.states?.map((value, index) => (
                    <Option key={index} value={value.state}>
                      {value.state}
                    </Option>
                  ))}
                </Select>
              </div>
              {errors.state && <span className="text-sm  text-red-500">{" * "+ errors.state}</span>}
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
              {errors.district && <span className="text-sm  text-red-500">{" * "+ errors.district}</span>}
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
              {errors.fatherName && <span className="text-sm  text-red-500">{" * "+ errors.fatherName}</span>}
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
              {errors.motherName && <span className="text-sm  text-red-500">{" * "+ errors.motherName}</span>}
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
              {errors.fatherOccupation && <span className="text-sm  text-red-500">{" * "+ errors.fatherOccupation}</span>}
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
              {errors.motherOccupation && <span className="text-sm  text-red-500">{" * "+ errors.motherOccupation}</span>}
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
            {errors.rollNumber && <span className="text-sm  text-red-500">{" * "+ errors.rollNumber}</span>}
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
              {errors.fatherNumber && <span className="text-sm  text-red-500">{" * "+ errors.fatherNumber}</span>}
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
              {errors.motherNumber && <span className="text-sm  text-red-500">{" * "+ errors.motherNumber}</span>}
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
              {errors.whatsappNumber && <span className="text-sm  text-red-500">{" * "+ errors.whatsappNumber}</span>}
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
              {errors.centre && <span className="text-sm  text-red-500">{" * "+ errors.centre}</span>}
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

export default FormView;
