const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const mongoose = require('mongoose');
const { AppError } = require("../AppError");

//get the pending userList
const pendingUserController = asyncWrapper(async (req, res, next) => {
  const pendingData = await UserModel.find({ activestatus: false });

  if (pendingData.length < 1) {
    res.status(200).json({ message: "no pending users!" });
  } else {
    res.status(200).json({ count: pendingData.length, data: pendingData });
  }
});

//get all users

const allUserController = asyncWrapper(async (req, res, next) => {
    const allData = await UserModel.find();
  
    if (allData.length < 1) {
      res.status(200).json({ message: "no users!" });
    } else {
      res.status(200).json({ count: allData.length, data: allData });
    }
  });

  //get user by id
  const oneUserController = asyncWrapper(async (req, res, next) => {

    const userId = req.params.id;
    

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(400, "invalid Id!");
      }else{
        const userData = await UserModel.findById(userId);

        if(!userData){
         
            throw new AppError(404, "no user found!");
            
        }else{
            res.status(200).json({  data: userData });
        }

      }
    
    

   

  });

module.exports = { pendingUserController,allUserController,oneUserController };
