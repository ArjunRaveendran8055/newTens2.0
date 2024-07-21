import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { Link ,useParams} from 'react-router-dom';
import axios from 'axios';

function Batches() {
  const [isVisible, setIsVisible] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [classStandard, setClassStandard] = useState('');
  const [stream, setStream] = useState('');
  const [error, setError] = useState('');
  const [classes, setClasses] = useState([]);
  const [error2, setError2] = useState('');

    // centre ID
    const { id } = useParams();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`/centre/getAllClass/${id}`);
        setClasses(response.data);
      } catch (error) {
        setError2('Error fetching classes');
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
    // Set visibility to true after component mounts to trigger transition
    setIsVisible(true);
  }, []);

  const handleClassChange = (e) => {
    const value = e.target.value;
    if (value > 12 ) {
      setError('Class (Standard) should not be greater than 12');
    } else {
      setError('');
    }
    setClassStandard(value);
  };

  const handleOpenAddClass = () => {
    setOpenAddClass((cur) => !cur);
  };

  const handleSubmit = async () => {
    if (classStandard <= 12) {
      const classData = {
        class: classStandard,
        stream: stream
      };

      try {
        const response = await axios.put(`/centre/addClass/${id}`, classData);
        // console.log('Updated Centre:', response.data);
        // Close the dialog or reset the form here if needed
        setClassStandard('');
        setStream('');
        handleOpenAddClass(); // Close the dialog
      } catch (error) {
        console.error('Error adding class:', error);
      }
    } else {
      setError('Class (Standard) should not be greater than 12');
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto my-8 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">PARAVOOR - CLASS LIST</h1>
        {error2 && <p style={{ color: 'red' }}>{error2}</p>}
        
      </div>
      <div className="flex items-center justify-center pb-6 mb-6 border-black border-b-[1px]">
        {/* <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
          <input
            className="bg-white dark:bg-gray-800 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search Centre..."
            type="text"
          />
        </div> */}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={()=>setOpenAddClass(true)}>
          Add Class
        </button>
      </div>

      <Dialog
        size="md"
        open={openAddClass}
        handler={handleOpenAddClass}
        className="flex"
      >
       <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Class
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Class (Standard)
            </Typography>
            <Input
            type='number'
              label="Enter Class"
              size="lg"
              value={classStandard}
              onChange={handleClassChange}
            />
             {error && <Typography color="red">{error}</Typography>}

<Typography className="-mb-2" variant="h6">
              Stream
            </Typography>
            <Select
                label="Class"
                value={stream}
            onChange={(value) => setStream(value)}
              >
                <Option value="hs">Higher Secondary (HS)</Option>
                <Option value="up">Upper Primary (UP)</Option>
              </Select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      {/* LOOP CLASSES FROM HERE */}
      {classes.map((cls, index) => (
      
      <div key={index} className={`space-y-4 mt-5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}  transition-transform duration-1000`}>
        <Card className="flex flex-col">
          <div className="flex items-start space-x-4 p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-semibold">Class {cls.class} ({cls.stream})</h2>
              </div>
              <p className="text-sm mt-3 text-muted-foreground">Accessing classes made easy. Track, analyse and execute!</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">                                                                                 
                <span>#new10s</span>
                <span>#analytics</span>
              </div>
            </div>
            <div className="text-lg font-semibold self-end">2732 Students</div>
          </div>
          <div className="flex space-x-2 border-t p-4">
          <Link to={`/displaybatches`}>
            <Button variant="outlined" className="text-sm" >
              Batches
            </Button>
          </Link>
          </div>
        </Card> 
      </div>

))}


    </div>
  );
}

export default Batches;
