const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { StudentModel } = require("../models/StudentModel");

const getAllStudentsController = asyncWrapper(async (req, res, next) => {
  const { roll, name, phno } = req.query;
  console.log("set seteyy...");
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

module.exports = {
  getAllStudentsController,
};
