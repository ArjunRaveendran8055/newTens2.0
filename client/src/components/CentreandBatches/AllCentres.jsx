import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import { Link } from "react-router-dom";
function AllCentres() {
  const dispatch = useDispatch();
  const [allCentres, setAllCentres] = useState([]);
  const [openAddCentre, setOpenAddCentre] = useState(false);

  // state below this is to post to backend
  const [centreName, setCentreName] = useState('');
  const [centreTag, setCentreTag] = useState('');
  const [incharge, setIncharge] = useState(['', '']);
  const [errors, setErrors] = useState({ centreName: '', centreTag: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  
  const handleInchargeChange = (index, value) => {
    const newIncharge = [...incharge];
    newIncharge[index] = value;
    setIncharge(newIncharge);
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = { centreName: '', centreTag: '' };

    if (!centreName) {
      newErrors.centreName = 'Centre Name is required';
      valid = false;
    }

    if (!centreTag) {
      newErrors.centreTag = 'Centre Tag is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const centreData = {
      centrename: centreName.toLowerCase(),
      tag: centreTag.toLowerCase(),
      incharge: incharge.filter(name => name !== ''), 
    };

    try {
      const response = await axios.post('/centre/createCentre', centreData);
      console.log('Centre added:', response.data);
      // Reset form fields and errors after successful submission
      setCentreName('');
      setCentreTag('');
      setIncharge(['', '']);
      setErrors({ centreName: '', centreTag: '' });
      handleOpenAddCentre()
      setIsFormSubmitted(true)
    } catch (error) {
      console.error('Error adding centre:', error);
    }
  };

  useEffect(() => {
    dispatch(setLoader());
    axios
      .get("/centre/getAllCentres")
      .then((res) => {
        console.log("result", res.data.result);
        setAllCentres(res.data.result);
        dispatch(removeLoader());
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(removeLoader());
      });
      if (isFormSubmitted) {
        setIsFormSubmitted(false);
      }
  }, [isFormSubmitted]);

  const handleOpenAddCentre = () => {
    setOpenAddCentre((cur) => !cur);
  };
  return (
    <div className="p-6 rounded-lg">
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
          onClick={()=>setOpenAddCentre(true)}
        >
          Add Centre
        </button>
      </div>

      <Dialog
        size="md"
        open={openAddCentre}
        handler={handleOpenAddCentre}
        className="flex"
      >
       <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Centre
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Centre Name
            </Typography>
            <Input
              label="Enter Centre Name"
              size="lg"
              value={centreName}
            onChange={(e) => setCentreName(e.target.value)}
            error={!!errors.centreName}
            />
             {errors.centreName && <span className="text-red-500">{errors.centreName}</span>}

<Typography className="-mb-2" variant="h6">
              Centre Tag
            </Typography>
            <Input
              label="Enter Centre Tag"
              size="lg"
              value={centreTag}
            onChange={(e) => setCentreTag(e.target.value)}
            error={!!errors.centreTag}
            />
             {errors.centreTag && <span className="text-red-500">{errors.centreTag}</span>}

          <Typography className="-mb-2" variant="h6">
                        Incharge
                      </Typography>
                  
                      <Input
                        label="Enter First person's Name"
                        size="lg"
                        value={incharge[0]}
            onChange={(e) => handleInchargeChange(0, e.target.value.toLowerCase())}
                      />
                       <Input
                        label="Enter Second person's Name"
                        size="lg"
                        value={incharge[1]}
            onChange={(e) => handleInchargeChange(1, e.target.value.toLowerCase())}
                      />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Create
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCentres.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
            <div className="p-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 uppercase">
                  {item.centrename}
                </h3>
              </div>
              <p className="text-black mb-4 capitalize">
                Charge: {item.incharge.join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-black text-sm">Version 5.0.0</span>
                <Link key={index} to={`/batches`}>
                <Button size="sm" variant="outlined" className="rounded-full">
                  Manage
                </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default AllCentres;
