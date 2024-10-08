import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
import addImg from '../../layouts/addimg.png'
import compressImage from "browser-image-compression";
import { SERVER_URL } from '../../server';
import { setToastView } from '../features/toast/toastSlice';
import { useDispatch } from "react-redux";

const ManageStaffs = () => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState(addImg);
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [errors, setErrors] = useState({});
    const [photo, setPhoto] = useState(null);
    const [editUser, setEditUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        dob: '',
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [newUser, setNewUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'TA',
        dob: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(8);
    const [reloadPage, setReloadPage] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/user/getAllUserList?page=${currentPage}&limit=${limit}`);
                setUsers(response.data.data);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [showEditModal,showAddModal,currentPage, limit,reloadPage]);

    const confirmDelete = (userId) => {
        setUserToDelete(userId);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/user/deleteuser/${userToDelete}`);
            setUsers(users.filter(user => user._id !== userToDelete));
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Log newUser to ensure it's populated correctly
            console.log(newUser); // Check that this contains the expected key-value pairs

            // Append all newUser fields to FormData
            Object.keys(newUser).forEach(key => {
                if (key === 'dob') {
                    // Convert dob if needed (e.g., Date object to string)
                    formData.append(key, new Date(newUser[key]).toISOString());
                } else {
                    formData.append(key, newUser[key]); // Append all other fields as is
                }
            });

            // Add photo to FormData if it exists
            if (photo) {
                formData.append('photo', photo); // Ensure photo is a File object
            }

            formData.append('activeStatus', true);

            // Log FormData content for debugging
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            // Send POST request with FormData
            const response = await axios.post('/user/CreateNewUser', formData, {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            });

            // Update users state and close modal
            setUsers([...users, response.data]);
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditClick = async (userId) => {
        try {
            // Fetch the user data from the server
            const { data } = await axios.get(`/user/getOneUser/${userId}`);
            setEditUser(data.data); // Populate the form with user data
            setShowEditModal(true);
            setImageUrl(`${SERVER_URL}/uploads/users/`+data.data.image) // Open the edit modal

        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    // Handle input change for the edit form
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prev) => ({
            ...prev,
            [name]: value, // Update the state based on the input's name attribute
        }));
    };


// Submit the edited user data, including the image
const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Append user data fields to the FormData
    formData.append('firstname', editUser.firstname);
    formData.append('lastname', editUser.lastname);
    formData.append('email', editUser.email);
    formData.append('role', editUser.role);
    formData.append('dob', editUser.dob);
  
    // Append the image file if a new one was selected
    if (photo) {
      formData.append('photo', photo); // 'photo' should be the compressed image state
    }
  
    try {
      const response = await axios.put(`/user/EditUser/${editUser._id}`, formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
  
      setShowEditModal(false); // Close modal after successful update
      console.log(response);
      
      dispatch(
        setToastView({ type: "success", msg: response.data.message })
      );
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch(
        setToastView({ type: "error", msg: error.message })
      );
    }
  };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const compressedFile = await compressImage(file, {
                maxSizeMB: 0.25, // Maximum size in megabytes
                maxWidthOrHeight: 900, // Maximum width or height
                useWebWorker: true, // Use web workers for faster compression (optional)
            });

            // Now you can use the compressedFile for further processing or uploading
            // console.log("Compressed image:", compressedFile);
            setPhoto(compressedFile);
        } catch (error) {
            console.error("Error compressing image:", error);
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

     // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTerminateUser = async (id) => {
    try {
        const response = await axios.post('/user/terminateUser', { id: id });
        dispatch(
            setToastView({ type: "success", msg: response.data.message })
          );
        setShowDeleteModal(false); // Close modal after success
        setReloadPage((prev) => !prev); // Toggle state to re-render
      } catch (error) {
        console.error('Error deactivating user:', error);
        dispatch(
            setToastView({ type: "error", msg: "Failed to Terminate" })
          );
      }
  };

  const handleApproveUser = async (id) => {
    try {
        const response = await axios.post('/user/approveStatus', { id: id });
        dispatch(
            setToastView({ type: "success", msg: response.data.message })
          );
        setShowDeleteModal(false); // Close modal after success
        setReloadPage((prev) => !prev); // Toggle state to re-render
      } catch (error) {
        console.error('Error approving user:', error);
        dispatch(
            setToastView({ type: "error", msg: "Failed to Approve" })
          );
      }
  };



    return (
        <div className="container mx-auto pt-9">
            <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between">
                <h2 className="text-lg font-semibold">STAFF DETAILS</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddModal(true)}
                >
                    Add User
                </button>
            </div>
            
            <div className="overflow-x-auto bg-white shadow-md rounded-b-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Head */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Designation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">DOB</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={user.image ? `${SERVER_URL}/uploads/users/${user.image}` : 'https://via.placeholder.com/40'} alt={user.firstname} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-s capitalize font-medium text-gray-900">{user.firstname + " " + user.lastname}</div>
                                            <div className="text-sm text-black">Email: {user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-s text-gray-900">{user.role?.toUpperCase()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.activestatus
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-gray-800'
                                            }`}
                                    >
                                        {user.activestatus ? "Online" : "Offline"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{user.dob}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3 mt-2">
                                    <button>
                                        <FaUserEdit size={26} onClick={() => handleEditClick(user._id)} />
                                    </button>
                                    {user.activestatus ? 
                                    <button onClick={() => handleTerminateUser(user._id)}>
                                        <ImUserMinus color="brown" size={26} />
                                    </button>
                                    :
                                    <button>
                                        <SiTicktick onClick={()=> handleApproveUser(user._id)} color="green" size={22} />
                                    </button>
                                    }
                                    <button onClick={() => confirmDelete(user._id)}>
                                        <MdDelete color="red" size={26} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {/* Pagination Design */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-200">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <div className="inline-flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-l-md text-gray-500 bg-white border-gray-300 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-r-md text-gray-500 bg-white border-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Next
          </button>
        </div>
      </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Delete User</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Are you sure you want to delete this user? This action cannot be undone.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                            <div className="flex justify-center first-letter:sm:flex sm:items-start">
                                <div className="w-full sm:w-2/3">
                                    <h3 className="text-xl leading-6 font-bold underline flex justify-center text-gray-900 mb-4">Add User</h3>

                                    <div name="photo" className="w-52 p-2 mx-auto mb-10 rounded ">
                                        <label htmlFor="imageUpload">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <input
                                                        required
                                                        type="file"
                                                        id="imageUpload"
                                                        accept=".png, .jpg, .jpeg"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="imageUpload"
                                                        className=" px-2 py-1 absolute ml-36  mt-40 inline-block w-9 h-9 bg-white rounded-full border border-gray-300 shadow cursor-pointer  hover:bg-gray-100"
                                                    >
                                                        <i className="fas fa-camera fa-lg text-gray-600 "></i>
                                                    </label>
                                                </div>

                                                <div className="avatar-preview">
                                                    <div
                                                        id="imagePreview"
                                                        className="w-48 h-48 bg-cover bg-center rounded-full border-4 border-gray-300"
                                                        style={{ backgroundImage: `url(${imageUrl})` }}
                                                    ></div>
                                                    {errors.photo && (
                                                        <span className="text-sm text-center text-red-500">
                                                            {" * " + errors.photo}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <form onSubmit={handleAddUser}>
                                        <div className="mb-4">
                                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                placeholder="First Name"
                                                value={newUser.firstname}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                placeholder="Last Name"
                                                value={newUser.lastname}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email"
                                                value={newUser.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                value={newUser.password}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"

                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <select
                                                name="role"
                                                id="role"
                                                value={newUser.role}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            >
                                                <option value="TA">TA</option>
                                                <option value="TEAMLEAD">TEAMLEAD</option>
                                                <option value="AA">AA</option>
                                                <option value="MENTOR">MENTOR</option>
                                                <option value="MARKETING">MARKETING</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                placeholder="Date of Birth"
                                                value={newUser.dob}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"

                                            />
                                        </div>
                                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                Add User
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                                onClick={() => setShowAddModal(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {showEditModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                            <div className="flex justify-center first-letter:sm:flex sm:items-start">
                                <div className="w-full sm:w-2/3">
                                    <h3 className="text-xl leading-6 font-bold underline flex justify-center text-gray-900 mb-4">Edit User</h3>

                                    <div name="photo" className="w-52 p-2 mx-auto mb-10 rounded ">
                                        <label htmlFor="imageUpload">
                                            <div className="avatar-upload">
                                                <div className="avatar-edit">
                                                    <input
                                                        type="file"
                                                        id="imageUpload"
                                                        accept=".png, .jpg, .jpeg"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="imageUpload"
                                                        className=" px-2 py-1 absolute ml-36 mt-40 inline-block w-9 h-9 bg-white rounded-full border border-gray-300 shadow cursor-pointer  hover:bg-gray-100"
                                                    >
                                                        <i className="fas fa-camera fa-lg text-gray-600 "></i>
                                                    </label>
                                                </div>

                                                {/* `${SERVER_URL}/uploads/users/${user.image}` 
                                                { backgroundImage: `url(${imageUrl || editUser?.photo})*/}
                                                <div
                                                    id="imagePreview"
                                                    className="w-48 h-48 bg-cover bg-center rounded-full border-4 border-gray-300"

                                                    style={  { backgroundImage: `url(${imageUrl})` }}
                                                ></div>
                                            </div>
                                        </label>
                                    </div>

                                    <form onSubmit={handleUpdateUser}>
                                        <div className="mb-4">
                                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                placeholder="First Name"
                                                value={editUser.firstname}
                                                onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                placeholder="Last Name"
                                                value={editUser.lastname}
                                                onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email"
                                                value={editUser.email}
                                                onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                            <select
                                                name="role"
                                                id="role"
                                                value={editUser.role} onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            >
                                                <option value="TA">TA</option>
                                                <option value="TEAMLEAD">TEAMLEAD</option>
                                                <option value="AA">AA</option>
                                                <option value="MENTOR">MENTOR</option>
                                                <option value="MARKETING">MARKETING</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Create New Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                value={editUser?.dob}
                                                onChange={handleEditChange}
                                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                                            />
                                        </div>

                                        <button type="submit" className="w-full inline-flex justify-center rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-700">
                                            Save Changes
                                        </button>
                                        <button type="button" onClick={() => setShowEditModal(false)} className="w-full mt-3 inline-flex justify-center rounded-md bg-gray-300 text-gray-700 px-4 py-2">
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            )}


        </div>
    );
};

export default ManageStaffs;