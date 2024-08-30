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
import { removeLoader, setLoader } from "../features/Loader/loaderSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function AllCentres() {
  const [allCentres, setAllCentres] = useState([]);
  const [openAddCentre, setOpenAddCentre] = useState(false);

  // state below this is to post to backend
  const [centreName, setCentreName] = useState('');
  const [centreTag, setCentreTag] = useState('');
  const [incharge, setIncharge] = useState(['', '']);
  const [errors, setErrors] = useState({ centreName: '', centreTag: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  
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
    axios
      .get("/centre/getAllCentres")
      .then((res) => {
        setAllCentres(res.data.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
      if (isFormSubmitted) {
        setIsFormSubmitted(false);
      }
  }, [isFormSubmitted]);

  const handleOpenAddCentre = () => {
    setOpenAddCentre((cur) => !cur);
  };

  const deleteItem = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`/centre/deleteCentre/${itemToDelete._id}`);
        // Refresh or update the state to reflect deletion
        setAllCentres(allCentres.filter(centre => centre._id !== itemToDelete._id));
        closeModal();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-center justify-center pb-6 mb-6 border-black border-b-[1px]">
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

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
        ?

        Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCardCentre key={index} />
                ))
        :
        <>
        {allCentres.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105">
            <div className="p-4">
              <div className="flex justify-between align-middle">
                <h3 className="text-lg font-semibold mb-2 uppercase">
                  {item.centrename}
                </h3>
                <MdDelete color="red"  onClick={() => openModal(item)} size={20} className="cursor-pointer" />
              </div>
              
             
              <p className="text-black mb-4 capitalize">
                Charge: {item.incharge.join(", ")}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-black text-sm">Version 5.0.0</span>
                <Link key={index} to={`/allcentres/batches/${item._id}`}>
                <Button size="sm" variant="outlined" className="rounded-full">
                  Manage
                </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
                </>
        }
       

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl mb-4">Delete Confirmation</h2>
            <p>Are you sure you want to delete {itemToDelete?.centrename} Centre?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={deleteItem}>
                Yes, Delete
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}


function SkeletonCardCentre() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transform transition-transform hover:scale-105 animate-pulse">
      <div className="p-4">
        <div className="flex justify-between align-middle">
          <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        </div>
        
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}



export default AllCentres;
