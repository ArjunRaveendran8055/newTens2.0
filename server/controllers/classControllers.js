const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ApproveStudentModel } = require("../models/ApproveStudentModel");
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
    classstream,
    classsession,
  } = req.body;

  if (
    tutorname == "" ||
    classname == "" ||
    classdate == "" ||
    classsyllabus == "" ||
    classsubject == "" ||
    classstream == "" ||
    classsession == ""
  ) {
    throw new AppError(400, "required all fields!");
  }

  // console.log("classDate :", classdate);

  const studentsData = await ApproveStudentModel.find(
    {
      syllabus: classsyllabus,
      level: classstream,
      class: classname,
      session: classsession,
    },
    { student_name: 1, roll_no: 1, informedData: 1 }
  );

  // console.log(studentsData)

  const finalStudentData = studentsData.map((data) => {
    let modified = {
      studentId: data._id,
      roll_no: data.roll_no,
      student_name: data.student_name,
      informedData: data.informedData,
    };

    return modified;
  });

  // Create a new Date object from the string
  var mongoDate = new Date(classdate);
  const newClass = new ClassModel({
    tutorname,
    classname,
    classdate: mongoDate,
    classexam,
    classsyllabus,
    classsubject,
    classstream,
    classsession,
    students: finalStudentData,
  });

  const savedClass = await newClass.save();

  console.log(savedClass._id.toString(), "saved");




  // mark key add cheyyanam, also subject of exam um venam
  const newReportEntry = {
        Type:"classType",
        classId:savedClass._id,
        tutor:tutorname,
        className:classname,
        classSubject:classsubject,
        classMinDuration:null,
        allowedJoinTime:null,
        examSubject:null,
        maximumMark:null,
        minimumMark:null,
        attendDuration:null,
        joinTime:null,
        reportDetail:{
          reportedBy:{},
          followUp:null,
          report:[],
          remark:null,
          respondedBy:{}
        },
  };

  const bulkOperations = studentsData.map((student) => {
    return {
      updateOne: {
        filter: { _id: student._id },
        update: { $push: { report: newReportEntry } },
      },
    };
  });

  // Execute bulk write
  if (bulkOperations.length > 0) {
    await ApproveStudentModel.bulkWrite(bulkOperations);
  }

  res
    .status(201)
    .json({ success: true, message: "class created sucessfully!", savedClass });
});

const updateClassController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;
  const {
    tutorname,
    classname,
    classdate,
    classexam,
    classsyllabus,
    classsubject,
    classstream,
    classsession,
  } = req.body;

  if (
    !tutorname ||
    !classname ||
    !classdate ||
    !classexam ||
    !classsyllabus ||
    !classsubject ||
    !classstream ||
    !classsession
  ) {
    throw new AppError(400, "required all fields!");
  }

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "invalid Id!");
  }

  const updatedClass = await ClassModel.findByIdAndUpdate(
    classId,
    {
      tutorname,
      classname,
      classdate,
      classexam,
      classsyllabus,
      classsubject,
      classstream,
      classsession,
    },
    { new: true }
  );

  if (!updatedClass) {
    throw new AppError(404, "No class found by ID!");
  }

  res
    .status(200)
    .json({ success: true, message: "updated sucessfully!", updatedClass });
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

  res
    .status(200)
    .json({ success: true, message: "Class deleted successfully!" });
});

const getAllClassesController = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const syllabus = req.query.syllabus;

  console.log(syllabus);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await ClassModel.countDocuments();

  let classes;

  if (syllabus) {
    classes = await ClassModel.find({ classsyllabus: syllabus })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });
  } else {
    classes = await ClassModel.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({ count: classes.length, classes, pagination });
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
