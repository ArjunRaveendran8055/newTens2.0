const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { SchoolModel } = require("../models/SchoolModel");
const mongoose = require("mongoose");

const getSchoolList = asyncWrapper(async(req,res,next)=>{
   const {search,syllabus,abroad} = req.body;
   const regex = new RegExp(search, 'i');
   if(syllabus){
    const result = await SchoolModel.find({ "name": { $regex: regex },"syllabus":syllabus });
    console.log(result);
    if (!result) {
        throw new AppError(404, "no results found!");
    } else {
        res.status(200).json({ success:true, data: result });
    }
   }else{
     const result = await SchoolModel.find({ "name": { $regex: regex } });
     console.log(result);
     if (!result) {
      throw new AppError(404, "no results found!");
    } else {
      res.status(200).json({ success:true, data: result });
    }
   }
 

})

module.exports = {
    getSchoolList
  };