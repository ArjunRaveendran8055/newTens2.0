const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { StudentModel } = require("../models/StudentModel");
const mongoose = require("mongoose");

//fetch all students
const getAllStudentsController = asyncWrapper(async (req, res, next) => {
  const { roll, name, phno } = req.query;
  console.log(`roll :${roll}\nname: ${name}\nphone:${phno}`);
  const queryObj = {};
  if (roll) {
    queryObj.roll_no = { $regex: `^${roll}`, $options: "i" };
  }
  if (name) {
    queryObj.student_name = { $regex: `^${name}`, $options: "i" };
  }
  if (phno) {
    queryObj.whatsapp_no = { $regex: `^${phno}`, $options: "i" };
  }

  const result = await StudentModel.find(queryObj);
  if (result.length === 0) {
    throw new AppError(400, "No Match Found.");
  }
  res.status(200).json({ data: result, sucess: true });
});

//student details using student id as params
const getStudentDetailsController = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid StudentID.");
  }
  const result = await StudentModel.findById(id);
  if (!result) {
    throw new AppError(400, "SomeThing wrong with StudentID.");
  }
  res.status(200).json({
    data: result,
    success: true,
    message: "student details fetched Successfully.",
  });
});

//controller to add a student report
const addReportController = asyncWrapper(async (req, res, next) => {
  const { id, callType, reason, response, handledBy } = req.body;

  const reportObj = {
    callType,
    reason,
    response,
    handledBy,
    time: new Date(Date.now()),
  };
  const result = await StudentModel.findByIdAndUpdate(id, {
    $push: { report: reportObj },
  });
  if (!result) {
    throw new AppError(400, "Report Insertion Failed!");
  }
  res.status(200).json({
    data: result,
    success: true,
    message: "Report Added SuccessFully.",
  });
});

//getSsrReport of a student using id as params
const fetchStudentReportsController = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid StudentID.");
  }
  const result = await StudentModel.findById(id);
  console.log("result is", result);
  if (!result) {
    throw new AppError(400, "SomeThing wrong with StudentID.");
  }

  res.status(200).json({
    data: result.report,
    success: true,
    message: "Reports sent successfully.",
  });
});

module.exports = {
  getAllStudentsController,
  getStudentDetailsController,
  addReportController,
  fetchStudentReportsController,
};
