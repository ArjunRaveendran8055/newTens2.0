import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button } from "@material-tailwind/react";
import axios from 'axios';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function DisplayBatches() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchUsers();
  }, []);


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
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-850">
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">10</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">A</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">

            </td>
            <td>
              <Button>Update</Button>
            </td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-850">
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">10</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">B</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">

            </td>
            <td>
              <Button>Update</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DisplayBatches