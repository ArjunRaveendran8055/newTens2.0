import React, { useEffect, useState } from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import axios from "axios";

const RegForm = () => {
  const [syllabus, setSyllabus] = useState("");
 
  const [schools, setSchools] = useState([]);
  


  const [isOpen, setIsOpen] = useState(false);


  const [selectedSchool, setSelectedSchool] = useState([]);

 
  
  useEffect(() => {
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

  }, [syllabus,selectedSchool]);

  const handleSchoolChange = (schoolName) => {
    console.log(schoolName)
    
    setSelectedSchool(schoolName.toLowerCase());
    setIsOpen(true); // Close the school list after selection
    // Set the selected school in the input field
   
    
  };

  const handleSchoolChange2 = (schoolName) => {
    console.log(schoolName)
    
    setSelectedSchool(schoolName.toLowerCase());
    setIsOpen(false); // Close the school list after selection
    // Set the selected school in the input field
   
    
  };

  return (
    <div  className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">
          <img
            className="aspect-square h-full w-full"
            alt="Student Avatar"
            src="data:image/png;base64,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"
          />
        </span>
        <h1 className="text-xl font-semibold mt-4">Add Student</h1>
      </div>
      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="full-name">Full Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="full-name"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label htmlFor="gender">Gender</label>

            <div className="w-50">
              <Select>
                <Option>Male</Option>
                <Option>Female</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              placeholder="Date Of Birth"
              id="dob"
              className="h-10 w-full   rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="dob"
            />
          </div>

          <div></div>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="address"
            placeholder="Address"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            placeholder="Enter your email"
            type="email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="class">Class</label>
            <div className="w-50">
              <Select>
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
              <Select onChange={(e) => setSyllabus(e)}>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">
            Select Your School
          </label>
          <input
            className="shadow uppercase appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="school"
            type="search"
            placeholder="Search for your school"
             // Open the school list on input focus
            onChange={(event)=>handleSchoolChange(event.target.value)}
            value={selectedSchool}

            
            
            
            
          />
        </div>
        {isOpen && (
          <ul className="border rounded uppercase border-gray-300 overflow-y-auto max-h-40 absolute top-full left-0 right-0 z-10 bg-white">
            {  schools?.map((school, index) => (
              <li
                key={index}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  selectedSchool === school.name ? 'bg-gray-100' : ''
                }`}
                onClick={() => handleSchoolChange2(school.name)}
              >
                {school.name}
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="school-location"
              placeholder="School location"
            />
          </div>

          <div>
            <label htmlFor="medium">Medium</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="medium"
              placeholder="Medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="district">District</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="district"
              placeholder="District"
            />
          </div>
          <div>
            <label htmlFor="father-name">Father's Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="father-name"
              placeholder="Father's Name"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mother-name">Mother's Name</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="mother-name"
              placeholder="Mother's Name"
            />
          </div>
          <div>
            <label htmlFor="pincode">Pin Code</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="pincode"
              placeholder="Pin Code"
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
            />
          </div>
          <div>
            <label htmlFor="mother-occupation">Mother's Occupation</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="mother-occupation"
              placeholder="Mother's Occupation"
            />
          </div>
        </div>

        <div>
          <label htmlFor="roll-number">Assign Roll Number (5 digit)</label>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="roll-number"
            placeholder="Assign Roll Number (5 digit)"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="father-number">Father's Number</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="father-number"
              placeholder="Father's Number"
            />
          </div>
          <div>
            <label htmlFor="mother-number">Mother's Number</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="mother-number"
              placeholder="Mother's Number"
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
            />
          </div>
          <div>
            <label htmlFor="centre">Centre</label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="centre"
              placeholder="Centre"
            />
          </div>
        </div>

        <div className="sibilingparent border-2 p-4 gap border-blue-gray-200 rounded-md">
          <div className="grid grid-cols-2">
            <div>
              <label htmlFor="class">Number of Siblings</label>
              <div className="w-30">
                <Select>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="siblings border-4 rounded-lg p-4 mt-3 ">
            <div>
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
                  <label htmlFor="siblingage">Age</label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="siblingage"
                    placeholder="enter age"
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
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Academic Status
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="academic-status"
                  value="Below Average"
                />
                <span className="ml-2 text-sm text-gray-900">
                  Below Average
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="academic-status"
                  value="Average"
                />
                <span className="ml-2 text-sm text-gray-900">Average</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="academic-status"
                  value="Good"
                />
                <span className="ml-2 text-sm text-gray-900">Good</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-blue-600"
                  name="academic-status"
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
              Difficult Subjects
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="Maths"
                />
                <span className="ml-2 text-sm text-gray-900">Maths</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="English"
                />
                <span className="ml-2 text-sm text-gray-900">English</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="Malayalam"
                />
                <span className="ml-2 text-sm text-gray-900">Malayalam</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="Hindi"
                />
                <span className="ml-2 text-sm text-gray-900">Hindi</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="Physics"
                />
                <span className="ml-2 text-sm text-gray-900">Physics</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  value="Chemistry"
                />
                <span className="ml-2 text-sm text-gray-900">Chemistry</span>
              </label>
              <label className="flex items-center">
                <input
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
          <Button className="mt-5">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default RegForm;