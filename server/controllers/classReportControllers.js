const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");

const createReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  const { roll, name, studentId, report, remark, reportedBy, followUp } =
    req.body;

  const newReport = {
    roll,
    name,
    studentId,
    report,
    remark,
    reportedBy,
    followUp,
  };

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "invalid Id!");
  }

  //    const allReports = await ClassModel.findById(classId)

  if (roll == "" || name == "" || studentId == "" || reportedBy == "") {
    throw new AppError(400, "required all fields!");
  }

  const updatedReport = await ClassModel.findOneAndUpdate(
    { _id: classId }, // Query to find the document
    { $push: { classreport: newReport } }, // Update to push data into the classreport array
    { new: true } // Option to return the modified document
  );

  if (!updatedReport) {
    throw new AppError(404, "No class found by ID!");
  }

  res
    .status(200)
    .json({ success: true, message: "updated sucessfully!", updatedReport });
});

module.exports = {
  createReportController,
};
