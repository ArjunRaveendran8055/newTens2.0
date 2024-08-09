import React, { useEffect, useState } from 'react'
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
} from "@material-tailwind/react";
import axios from 'axios';

function LeadBank() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        class: '',
        division: '',
        syllabus: '',
        district: '',
        school: '',
    });

    const [errors, setErrors] = useState({});
    const [schools, setSchools] = useState([]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.id]: '', // Clear the error when user starts typing
        });
    };

    const handleSelectChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
        setErrors({
            ...errors,
            [key]: '', // Clear the error when user selects an option
        });
    };

    const handleSubmit = () => {
        const newErrors = {};

        // Validate form fields
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log(errors);

        } else {
            console.log(formData);
        }
    };

    useEffect(() => {
        const fetchSchool = async (school) => {
            if (school.length > 2) {
                await axios.post("/registration/getschool", { syllabus: formData.syllabus, search: school })
                    .then((response) => {
                        console.log(response.data.data);
                        setSchools([...response.data.data]);
                    })
                    .catch((error) => console.log(error));
            } else {
                setSchools([]);
            }

        }
        fetchSchool(formData.school)
    }, [formData.syllabus, formData.school])




    return (
        <div className="bg-white shadow-lg min-h-[83vh] rounded-lg flex justify-center items-center mt-4 p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-md md:max-w-2xl p-4 sm:p-6 md:p-8">
                <CardHeader floated={false} shadow={false} className="pb-2">
                    <Typography variant="h5" className="text-xl md:text-2xl font-bold">
                        Student Lead Collection
                    </Typography>
                    <Typography variant="paragraph">
                        Fill out the form to enroll a new student.
                    </Typography>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                Name
                            </Typography>
                            <Input
                                id="name"
                                label="Enter student's name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                Phone
                            </Typography>
                            <Input
                                id="phone"
                                type="tel"
                                label="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                Class
                            </Typography>
                            <Input
                                id="class"
                                type="number"
                                label="Enter class number"
                                value={formData.class}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                Division
                            </Typography>
                            <Input
                                id="division"
                                label="Enter division"
                                value={formData.division}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                Syllabus
                            </Typography>
                            <Select
                                id="syllabus"
                                label="Select syllabus"
                                value={formData.syllabus}
                                onChange={(value) => handleSelectChange('syllabus', value)}
                            >
                                <Option value="state">STATE</Option>
                                <Option value="cbse">CBSE</Option>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                District
                            </Typography>
                            <Select
                                id="district"
                                label="Select district"
                                value={formData.district}
                                onChange={(value) => handleSelectChange('district', value)}
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
                                <Option value="thiruvananthapuram">Thiruvananthapuram</Option>
                                <Option value="wayanad">Wayanad</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <Typography variant="small" className="font-medium">
                                School
                            </Typography>
                            <Input
                                type="search"
                                id="school"
                                label="Enter school name"
                                value={formData.school}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="pt-4">
                    <Button className="w-full bg-red-500" onClick={handleSubmit}>
                        Submit Data
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}

export default LeadBank