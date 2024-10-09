const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const mongoose = require("mongoose");
const { AppError } = require("../AppError");
const { fetchAAbasedClasses, fetchMentorBasedClasses } = require("../helpers/FetchRoleBasedClassess");
const fs = require('fs');
const path = require('path');
const { encryptPassword } = require("../utils/bcrypt");
const { TutorModel } = require("../models/TutorModel");

//get the pending userList
const pendingUserController = asyncWrapper(async (req, res, next) => {
  const pendingData = await UserModel.find({ activestatus: false });

  if (pendingData.length < 1) {
    res.status(200).json({ success:true, message: "no pending users!" });
  } else {
    res.status(200).json({ success:true, count: pendingData.length, data: pendingData });
  }
});


//get allotted centre , classes , batches
const allottedAreas = asyncWrapper(async (req, res, next) => {
  
  console.log(res.user)

  if(res.user.role="AA"){
    const data = await fetchAAbasedClasses(res.user.id)
    res.status(200).json({success:true, data : data})
  }else if(res.user.role = "MENTOR"){
    const data = await fetchMentorBasedClasses(res.user.id)
    res.status(200).json({success:true, data : data})
  }else{
    throw new AppError(404, "invalid user role!");
  }



 // res.status(200).json({success:true, user : res.user})


});







//get all users

const allUserController = asyncWrapper(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided

  // Convert page and limit to integers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  // Calculate the skip value (how many records to skip for the current page)
  const skip = (pageNum - 1) * limitNum;

  // Fetch the total number of users excluding those with role "admin"
  const totalUsers = await UserModel.countDocuments({ role: { $ne: "admin" } });

  // Fetch users with pagination, excluding those with role "admin"
  const allData = await UserModel.find({ role: { $ne: "admin" } })
    .skip(skip)
    .limit(limitNum);

  if (allData.length < 1) {
    res.status(200).json({ success: true, message: "no users!" });
  } else {
    res.status(200).json({
      success: true,
      count: allData.length,
      totalUsers,
      currentPage: pageNum,
      totalPages: Math.ceil(totalUsers / limitNum),
      data: allData
    });
  }
});




//get user by id
const oneUserController = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "invalid Id!");
  } else {
    const userData = await UserModel.findById(userId);

    if (!userData) {
      throw new AppError(404, "no user found!");
    } else {
      res.status(200).json({ success:true, data: userData });
    }
  }
});

const terminateUserController = asyncWrapper(async (req,res,next)=>{
  const { id } = req.body; // Assuming the user's _id is sent in the body of the request

  // Find the user by id and update the active status to false
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { activestatus: false },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json({ message: 'User terminated successfully', updatedUser });
})

const approveUserStatusController = asyncWrapper(async (req, res, next) => {
  const { id } = req.body; // Assuming the user's _id is sent in the body of the request

  // Find the user by id and check if activestatus is false
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.activestatus === true) {
    return res.status(400).json({ message: 'User is already approved' });
  }

  // If activestatus is false, update it to true
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    { activestatus: true },
    { new: true } // Return the updated document
  );

  return res.status(200).json({ message: 'User approved successfully', updatedUser });
});


// create user for admin 

const createUserController = asyncWrapper(async (req, res, next) => {
  console.log(req.body, "req.body");

  const { firstname, lastname, dob, email, password, role, activeStatus } = req.body;

  // Validate required fields
  if (!firstname) {
    throw new AppError(400, "Firstname is required");
  }
  if (!lastname) {
    throw new AppError(400, "Lastname is required");
  }
  if (!dob) {
    throw new AppError(400, "Date of Birth (dob) is required");
  }
  if (!email) {
    throw new AppError(400, "Email is required");
  }
  if (!password) {
    throw new AppError(400, "Password is required");
  }

  // Additional validations
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError(409, "Email is already in use");
  }

  // Check if a file is uploaded
  let photoUrl;
  if (req.file) {
    photoUrl = req.file.filename; // Get the path where the photo is stored
  }

  // Conditionally set the activestatus
  const activestatus = activeStatus === 'true' || activeStatus === true ? true : false;

  // Format dob in YYYY-MM-DD format
  const formattedDob = new Date(dob).toISOString().split('T')[0]; // Extract the date part only
  const hashPass = encryptPassword(password);
  // Create and save new user
  const newUser = new UserModel({
    firstname,
    lastname,
    dob: formattedDob,  // Save the formatted dob
    email,
    password:hashPass,
    role: role || "TA",  // Default role is "TA" if not provided
    image: photoUrl,      // Save photo path to the user's record
    activestatus,         // Set activestatus based on request body or default to false
  });

  await newUser.save();

  // Response
  res.status(201).json({
    success: true,
    message: "User created successfully!",
    data: newUser,
  });
});





// edit user data for admin

const editUserController = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const { firstname, lastname, dob, email, password, role } = req.body;

  // Check if at least one field is provided for update
  if (!firstname && !lastname && !dob && !email && !password && !role && !req.file) {
    throw new AppError(400, "No fields specified for update");
  }

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid Id!");
  }

  // Prepare the data to be updated
  const updateData = {};
  if (firstname) updateData.firstname = firstname;
  if (lastname) updateData.lastname = lastname;
  if (dob) updateData.dob = dob;
  if (email) updateData.email = email;
  if (password) {
    const hashPass = encryptPassword(password);
    updateData.password = hashPass;
  }
  if (role) updateData.role = role;

  // Check if an image file was uploaded
  if (req.file) {
    // Assume you are using multer to store the uploaded file in req.file
    const newImagePath = req.file.filename;

    // Optionally, find the user to remove the old image (if applicable)
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError(404, "No user found by ID!");
    }

    // Delete the old image if it exists
    if (user.image) {
      const oldImagePath = path.join(__dirname, '../uploads/users', user.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error("Failed to delete old image:", err);
        }
      });
    }

    // Update the image field in the database
    updateData.image = newImagePath;
  }

  // Perform the update
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );

  // Handle case where the user is not found
  if (!updatedUser) {
    throw new AppError(404, "No user found by ID!");
  }

  // Success response
  res.status(200).json({
    success: true,
    message: "User updated successfully!",
    data: updatedUser,
  });
});


//get user by id
const approveUserController = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const { role } = req.body;

  if (!role) {
    throw new AppError(400, "role not specified");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "invalid Id!");
  } else {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role, activestatus: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new AppError(404, "no user found by id!");
    } else {
      res.status(200).json({ success:true, message: "user approved sucessfully!" });
    }
  }
});

const deleteUserByIdController = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(400, "Invalid ID!");
  } else {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(404, "No user found by ID!");
    }

    // Check if the user has an image, and delete it if it exists
    if (user.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', 'users', user.image); // Point to uploads/users

      // Delete the image file
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        } else {
          console.log('Image deleted successfully:', imagePath);
        }
      });
    }

    // Delete the user
    await UserModel.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "User and associated image deleted successfully!" });
  }
});

const getAllAAController = asyncWrapper(async (req, res) => {
  // Fetch users with role 'AA'
  const aaUsers = await UserModel.find({ role: 'AA' }, 'firstname lastname');
  // Fetch users with role 'MENTOR'
  const mentorUsers = await UserModel.find({ role: 'MENTOR' }, 'firstname lastname');

  if ((!aaUsers || aaUsers.length === 0) && (!mentorUsers || mentorUsers.length === 0)) {
    throw new AppError(404, "No users found!");
  } else {
    // Map the results to return the ids and names
    const aaUserNames = aaUsers.map(user => ({ id: user._id, name: `${user.firstname} ${user.lastname}` }));
    const mentorUserNames = mentorUsers.map(user => ({ id: user._id, name: `${user.firstname} ${user.lastname}` }));
    
    // Send both arrays to the frontend
    res.status(200).json({ 
      success: true, 
      data: {
        aaUsers: aaUserNames,
        mentorUsers: mentorUserNames
      }
    });
  }
});


// Controller to fetch tutors by name
const getTutorsByNameController = async (req, res) => {
    
    const query = req.query.name;
    // Using a regular expression for case-insensitive partial matching
    const tutors = await TutorModel.find({ name: new RegExp(query, 'i') });
    
    if (tutors.length === 0) {
      return res.status(404).json({ message: "No tutors found" });
    }
    
    res.status(200).json(tutors);
 
};



module.exports = {
  pendingUserController,
  allUserController,
  oneUserController,
  approveUserController,
  deleteUserByIdController,
  getAllAAController,
  editUserController,
  createUserController,
  allottedAreas,
  terminateUserController,
  approveUserStatusController,
  getTutorsByNameController
};
