const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { StudentModel } = require("../models/StudentModel");
const mongoose=require("mongoose")

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

const getStudentDetailsController = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid StudentID.");
  }
  const result = await StudentModel.findById(id);
  if (!result) {
    throw new AppError(400, "SomeThing wrong with StudentID.");
  }
  res
    .status(200)
    .json({
      data: result,
      success: true,
      message: "student details fetched Successfully.",
    });
});

module.exports = {
  getAllStudentsController,
  getStudentDetailsController,
};
