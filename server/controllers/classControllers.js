const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");

const createClassController = asyncWrapper(async (req, res, next) => {
  const {
    tutorname,
    classname,
    classdate,
    classexam,
    classsyllabus,
    classsubject,
  } = req.body;

  if (tutorname == "" || classname == "" || classdate == ""  || classsyllabus == "" || classsubject == "") {
    throw new AppError(400, "required all fields!");
  }

  const newClass = new ClassModel({
    tutorname,
    classname,
    classdate,
    classexam,
    classsyllabus,
    classsubject,
  });

  const savedClass = await newClass.save();

  res.status(201).json({success:true, message:"class created sucessfully!" ,savedClass});
});

const updateClassController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;
  const { tutorname, classname, classdate, classexam, classsyllabus,classsubject } =
    req.body;

    if (!tutorname || !classname || !classdate  || !classsyllabus  || !classsubject) {
      throw new AppError(400, "required all fields!");
    }

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "invalid Id!");
  }

  const updatedClass = await ClassModel.findByIdAndUpdate(
    classId,
    { tutorname, classname, classdate, classexam, classsyllabus, classsubject, },
    { new: true }
  );

  if (!updatedClass) {
    throw new AppError(404, "No class found by ID!");
  }

  res.status(200).json({success:true, message:"updated sucessfully!" ,updatedClass});
});

const deleteClassController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "invalid Id!");
  }

  const deletedClass = await ClassModel.findByIdAndDelete(classId);

  if (!deletedClass) {
    throw new AppError(404, "No class found by ID!");
  }

  res.status(200).json({ success:true, message: "Class deleted successfully!" });
});

const getAllClassesController = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const syllabus = req.query.syllabus;

  console.log(syllabus)

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await ClassModel.countDocuments();
  
  let  classes;

  if(syllabus){
     classes = await ClassModel.find({classsyllabus:syllabus}).skip(startIndex).limit(limit);
  }else{
    classes = await ClassModel.find().skip(startIndex).limit(limit);
  }

  

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit
    };
  }

  res.status(200).json({ count: classes.length ,classes, pagination });
});

const getClassByIdController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "invalid Id!");
  }

  const foundClass = await ClassModel.findById(classId);

  if (!foundClass) {
    throw new AppError(404, "No class found by ID!");
  }

  res.status(200).json(foundClass);
});

module.exports = {
  createClassController,
  updateClassController,
  deleteClassController,
  getAllClassesController,
  getClassByIdController,
};
