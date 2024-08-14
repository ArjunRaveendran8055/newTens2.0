import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Radio,
} from "@material-tailwind/react";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { setToastView } from "../features/toast/toastSlice";

function LeadBankForm() {
  const {user}=useSelector(state=>state.user)
  console.log("user is:",user.id);
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp:"",
    class: "",
    division: "",
    syllabus: "",
    district: "",
    school: "",
    location: "",
    addedBy:""
  });

  const [isKnown, setIsKnown] = useState(true);
  const [errors, setErrors] = useState({});
  const [schools, setSchools] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [schoolCopy, setSchoolCopy] = useState();

  const fetchSchool = async (school) => {
    if (school?.length > 2) {
      await axios
        .post("/registration/getschool", {
          syllabus: formData.syllabus,
          search: school,
        })
        .then((response) => {
          console.log(response.data.data);
          setSchools([...response.data.data]);
        })
        .catch((error) => console.log(error));
    } else {
      setSchools([]);
    }
  };

  useEffect(() => {
    fetchSchool(schoolCopy);
  }, [formData.syllabus, schoolCopy]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({
      ...errors,
      [e.target.id]: "", // Clear the error when user starts typing
    });
  };

  const handleChangeschool = (e) => {
    setSchoolCopy(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({
      ...errors,
      [e.target.id]: "", // Clear the error when user starts typing
    });
    setIsOpen(true);
  };

  const handleSelectChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });

    setErrors({
      ...errors,
      [key]: "", // Clear the error when user selects an option
    });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.name.length < 3) {
      newErrors.name = "enter valid name";
    }
<<<<<<< HEAD
    if(formData.phone >12 || formData.phone <7 ){
=======
    if(formData.class >12 || formData.class <7 ){
>>>>>>> origin/master
      newErrors.class="Invalid class"
    }
    
    if (!/^\d{6,15}$/.test(formData.phone)) {
      newErrors.phone = "number must be in between 6-15";
    }
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key] &&
        key !== "school" &&
        key !== "district" &&
        key !== "location" &&
        key !=="whatsapp"
      ) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  //console.log("errors are:", errors);

  const handleSelectSchool = (schoolName, schoollocation) => {
    setSchoolCopy(schoolName);
    setFormData({ ...formData, school: schoolName, location: schoollocation });
    setSchools([]); // Clear the schools array immediately
    document.getElementById("school").blur();
    console.log(formData);
    setIsOpen(false);
    // Blur the input field to close the dropdown
  };

  //handle form submission
  const handleSubmit = () => {
    //function to Validate form fields
    
    const newErrors = validate();
    //check there are no errors left in the custom error object
    if (Object.keys(newErrors).length === 0) {
      console.log("formData is", formData);
      axios
        .post("/leadBank/submitLead", formData)
        .then((res) => {
          console.log(res.data);
          setIsSaved(true);
          setTimeout(() => {
            setIsSaved(false);
          }, 2000);
          setFormData({
            name: "",
            phone: "",
            class: "",
            school: formData.school,
            division: "",
            syllabus: "",
            district: "",
            location: formData.location,
          });
          setSchools([]);
        })
        .catch((err) => {
          console.log(err.response.data.error);
          dispatch(
            setToastView({ type: "error", msg: err.response.data.error })
          );
        });
    }
  };

  return (
    <>
      <div className="relative bg-white shadow-lg min-h-[89vh] rounded-lg flex flex-col md:pt-4 lg:pt-0 mt-4 ">
        {isSaved && (
          <span
            className={`fixed bg-green-200 border border-green-400 px-4 py-2 rounded-md sm:right-5 lg:right-10 sm:top-5 lg:top-28 text-gray-700 flex justify-center items-center z-10 gap-2`}
          >
            <div className="flex p-[1px] justify-center items-center rounded-full">
              <TiTick className="text-2xl text-green-500" />
            </div>
            <span>Updation successFul</span>
          </span>
        )}
        <div className="sm:px-4 sm:pt-2 lg:px-10 lg:pt-5  flex w-ful">
          <span className="sm:text-xl lg:text-3xl border-b-[1px] border-gray-400">Lead Registration Form</span>
        </div>

        <div className="flex justify-center items-center w-full sm:mt-5 ">
          <Card className="w-full max-w-md md:max-w-2xl sm:p-2 md:p-8">
            <CardHeader floated={false} shadow={false} className="pb-2">
              <Typography
                variant="h5"
                className="text-xl md:text-2xl font-bold"
              >
                Student Lead Collection
              </Typography>
              <Typography variant="paragraph">
                Fill out the form to enroll a new student.
              </Typography>
            </CardHeader>
            <CardBody className="space-y-4 capitalize">
            <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    Name
                  </Typography>
                  <div>
                    <Input
                      className=" capitalize"
                      id="name"
                      label="Enter student's name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span className="text-red-400">{"* " + errors.name}</span>
                    )}
                  </div>
                </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    Phone
                  </Typography>
                  <div>
                    <Input
                      id="phone"
                      type="number"
                      label="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <span className="text-red-400">
                        {"* " + errors.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    whatsapp
                  </Typography>
                  <div>
                    <Input
                      id="whatsapp"
                      type="number"
                      label="Enter whatsapp number"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    Class
                  </Typography>
                  <div>
                    <Input
                      id="class"
                      type="number"
                      label="Enter class"
                      value={formData.class}
                      onChange={handleChange}
                      maxLength={2}
                    />
                    {errors.class && (
                      <span className="text-red-400">
                        {"* " + errors.class}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography
                    variant="small"
                    className="font-medium capitalize"
                  >
                    Division
                  </Typography>
                  <Input
                    className="uppercase"
                    id="division"
                    label="Enter division"
                    value={formData.division}
                    onChange={handleChange}
                    maxLength={1}
                  />
                  {errors.division && (
                    <span className="text-red-400">
                      {"* " + errors.division}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    Syllabus
                  </Typography>
                  <div>
                    <Select
                      id="syllabus"
                      label="Select syllabus"
                      value={formData.syllabus}
                      onChange={(value) =>
                        handleSelectChange("syllabus", value)
                      }
                    >
                      <Option value="state">STATE</Option>
                      <Option value="cbse">CBSE</Option>
                    </Select>
                    {errors.syllabus && (
                      <span className="text-red-400">
                        {"* " + errors.syllabus}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    District
                  </Typography>
                  <div></div>
                  <div>
                    <Select
                      id="district"
                      label="Select district"
                      value={formData.district}
                      onChange={(value) =>
                        handleSelectChange("district", value)
                      }
                    >
                      <Option value="none">Unknown</Option>
                      <Option value="thrissur">Thrissur</Option>
                      <Option value="ernakulam">Ernakulam</Option>
                      <Option value="alappuzha">Alappuzha</Option>
                      <Option value="idukki">Idukki</Option>
                      <Option value="kannur">Kannur</Option>
                      <Option value="kasaragod">Kasaragod</Option>
                      <Option value="kollam">Kollam</Option>
                      <Option value="kottayam">Kottayam</Option>
                      <Option value="kozhikode">Kozhikode</Option>
                      <Option value="malappuram">Malappuram</Option>
                      <Option value="palakkad">Palakkad</Option>
                      <Option value="pathanamthitta">Pathanamthitta</Option>
                      <Option value="thiruvananthapuram">
                        Thiruvananthapuram
                      </Option>
                      <Option value="wayanad">Wayanad</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="radio-btn-grp">
                <Radio
                  name="known"
                  value="known"
                  checked={isKnown === true}
                  onChange={() => {
                    setIsKnown(true);
                  }}
                  label="Known"
                />
                <Radio
                  name="unknown"
                  value="unknown"
                  checked={isKnown === false}
                  onChange={() => {
                    setIsKnown(false), setFormData({ ...formData, school: "" });
                  }}
                  label="Unknown"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Typography variant="small" className="font-medium">
                    School
                  </Typography>
                  <div>
                    <Input
                      className=" capitalize"
                      disabled={isKnown === false}
                      type="search"
                      id="school"
                      label={`${isKnown ? "Enter School Name" : "Unknown"}`}
                      value={schoolCopy}
                      onChange={handleChangeschool}
                    />
                  </div>
                </div>
                {isOpen && (
                  <ul
                    className={`absolute bg-white border border-gray-300 w-[550px] mt-16 z-10 max-h-40 overflow-y-auto`}
                  >
                    {schools.map((result, index) => (
                      <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          handleSelectSchool(result.name, result.location)
                        }
                      >
                        {result.name} , {result.location}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardBody>
            <CardFooter className="pt-4">
              <Button className="w-full bg-red-500" onClick={handleSubmit}>
                Submit Data
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}

export default LeadBankForm;
