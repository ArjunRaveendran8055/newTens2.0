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

  // state to store the details of AA and Mentors intialy
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [className2, setClassName] = useState(className);
  const [batch, setBatch] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  // to import batches from db
  const [batches, setBatches] = useState([]);
    //  state used to store class details as object and send through body to server
  const [classInfo, setClassInfo] = useState({
    id: id,
    class: className2,
    stream: stream
  });
  // store updated AA names 
  const [aaNames, setAaNames] = useState(null);
  // store All fetched mentor names from DB
  const [mentroNames, setMentorNames] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);


  // selection change for AA selection
  const handleSelectionChange = (event, newValue) => {
    setAaNames(newValue);
    setIsChanged(true);
  };

  // selection change for Mentor
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    if (selectedId === 'none') {
      // Set to empty array if "None" is selected
      setSelectedMentor([]);
    } else {
      const mentor = mentroNames.find((m) => m.id === selectedId);
      setSelectedMentor(mentor || null);
    }
  };

  // Handle update function for mentor update section
  const handleUpdateClick = async (batchname) => {
    try {
      console.log(batchname);
      const response = await axios.post('/centre/updateMentor', {
        id,
        class: className2,
        stream,
        batch: batchname,
        selectedMentor,
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating mentor:', error);
    }
  };

  // Fetch corresponing AA asociated with the class
  const fetchAANames = async () => {
    try {
      const response = await axios.post('/centre/getAAtoClass', classInfo);
      setAaNames(response.data.AANames);
      setError('');
    } catch (error) {
      console.error('Error fetching AA names:', error);
      setError('Failed to fetch AA names');
    }
  };


// fetch all AA users and Mentor users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/user/getAllAA');
      setUsers(response.data.data.aaUsers);
      setMentorNames(response.data.data.mentorUsers)
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all Batches Associated with this class
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

  // update AA to db
  const handleUpdate = async () => {
    try {
      const response = await axios.post('/centre/addAAtoClass', {
        id,
        className2,
        stream,
        batch,
        aaNames,
      });
      console.log('Update successful:', response.data);
      setIsChanged(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBatches();
    fetchAANames();
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);



  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  // ADD batch to associated class
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
          <tr className='px-4 py-3 text-left font-bold text-black dark:text-gray-100 flex justify-center'><td>Choose Academic Associate</td></tr>
          <tr className="flex flex-col md:flex-row justify-center items-center">
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300"></th>
            <th className="px-4 py-3 text-left font-bold text-black dark:text-gray-300">

              {
                aaNames && (
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={users}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    onChange={handleSelectionChange}
                    value={aaNames}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<span />}
                          checkedIcon={<span />}
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
                )
              }
              {!aaNames &&
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={users}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  onChange={handleSelectionChange}

                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<span />}
                        checkedIcon={<span />}
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
              }


            </th>
            <th>
              <Button
                onClick={handleUpdate}
                disabled={!isChanged}
              >
                Update
              </Button>
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

      <table className="w-full lg:max-w-3xl md:max-w-sm border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800">
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
                <div className="relative h-10 w-32 min-w-[100px]">

                  {batch.mentors && (
                    <select
                      className="peer h-full w-32 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={handleSelectChange}
                    >
                      <option value="">{batch.mentors[0]?.name || 'Select a Mentor'}</option>
                      {mentroNames
                        .filter(mentor => batch.mentors[0]?.id !== mentor.id)
                        .map((mentor) => (
                          <option key={mentor.id} value={mentor.id}>
                            {mentor.name}
                          </option>
                        ))}
                      {
                        batch.mentors[0]?.name && (
                          <option value="none">None</option>
                        )
                      }
                    </select>
                  )}

                  {!batch.mentors && (
                    <select
                      className="peer h-full w-32 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      onChange={handleSelectChange}
                    >
                      <option value="">None</option>
                      {mentroNames
                        .filter(mentor => mentor.id)
                        .map((mentor) => (
                          <option key={mentor.id} value={mentor.id}>
                            {mentor.name}
                          </option>
                        ))}
                    </select>
                  )}

                  <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-32 select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select a Mentor
                  </label>
                </div>
              </td>
              <td>
                <Button onClick={() => {// Set the selected batch
                  handleUpdateClick(batch.name); // Call the update function
                }} className="button">Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayBatches