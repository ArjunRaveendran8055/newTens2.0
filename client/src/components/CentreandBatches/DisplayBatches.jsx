import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function DisplayBatches() {

    const top100Films = [
        { name: 'Anju'},
        { name: 'Latha' },
        { name: 'Suma'},
        { name: 'Neethu' },]

  return (
<div className="flex justify-center my-8">

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
            <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
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
            </td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-850">
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">10</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">B</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
            <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DisplayBatches