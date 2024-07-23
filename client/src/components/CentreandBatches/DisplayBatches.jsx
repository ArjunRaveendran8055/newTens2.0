import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from 'axios';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function DisplayBatches() {
  const location = useLocation();
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);

  const className = queryParams.get('class');
  const stream = queryParams.get('stream');
  const id = location.pathname.split('/').pop();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [className2, setClassName] = useState(className); // Replace with actual className if needed
  const [batch, setBatch] = useState(''); 

  // to import batches from db
  const [batches, setBatches] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/user/getAllAA');
      setUsers(response.data.data.aaUsers);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await axios.post('/centre/getBatch', {
        id: id,
        class: className2,
        stream: stream,
      });
      setBatches(response.data.batches);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error fetching data');
      setBatches([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBatches();
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
    console.log("hii");
  }, [isFormSubmitted]);
 

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 

    try {
      const response = await axios.post('/centre/addBatch', {
        id,
        className2,
        stream,
        batch
      });
      setIsFormSubmitted(true)
      setOpen(false)
      console.log('Batch created:', response.data);
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  return (

    <div className="flex flex-col items-center gap-10 justify-center my-8">
      <table className="w-full max-w-3xl border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className='px-4 py-3 text-left font-bold text-black dark:text-gray-100 flex justify-center'><p>Choose Academic Associate</p></tr>
          <tr className='flex justify-center items-center'>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300"></th>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={users}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                )}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select" placeholder="Add More" />
                )}
              />
            </th>
            <th>
              <Button>Update</Button>
            </th>
          </tr>
        </thead>
      </table>

      <button
        onClick={handleOpen}
        type="button"
        className="text-white bg-blue-700 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Batch
      </button>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Create Batch
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Class
            </Typography>
            <div className="w-100">
              <Select disabled
                label={className}
              >
                <Option value={className}>{className}</Option>
              </Select>
            </div>


            <Typography className="-mb-2" variant="h6">
              Enter Batch
            </Typography>
            <Input
              label="Enter Batch"
              size="lg"
              value={batch}
          onChange={(e) => setBatch(e.target.value)}
            />

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <table className="w-full max-w-3xl border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">Class</th>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">Batch</th>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">Mentor</th>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">Assign</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {batches?.map((batch, index) => (
          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-850">
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
              {className} ({stream})
            </td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
              {batch.name}
            </td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
              hi
            </td>
            <td>
              <Button className="button">Update</Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayBatches