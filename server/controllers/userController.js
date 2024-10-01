const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const mongoose = require("mongoose");
const { AppError } = require("../AppError");
const { fetchAAbasedClasses, fetchMentorBasedClasses } = require("../helpers/FetchRoleBasedClassess");

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
  const allData = await UserModel.find();

  if (allData.length < 1) {
    res.status(200).json({ success:true, message: "no users!" });
  } else {
    res.status(200).json({ success:true, count: allData.length, data: allData });
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


// create user for admin 

const createUserController = asyncWrapper(async (req, res, next) => {
  const { firstname, lastname, dob, email, password, role } = req.body;

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

  // Create and save new user
  const newUser = new UserModel({
    firstname,
    lastname,
    dob,
    email,
    password,
    role: role || "TA",  // Default role is "TA" if not provided
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
  if (!firstname && !lastname && !dob && !email && !password && !role) {
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
  if (password) updateData.password = password;
  if (role) updateData.role = role;

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
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError(404, "No user found by ID!");
    } else {
      res.status(200).json({ success:true, message: "User deleted successfully!" });
    }
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



module.exports = {
  pendingUserController,
  allUserController,
  oneUserController,
  approveUserController,
  deleteUserByIdController,
  getAllAAController,
  editUserController,
  createUserController,
  allottedAreas
};
