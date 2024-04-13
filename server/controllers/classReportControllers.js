const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");

const createReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  const { roll, name, studentId, report, remark, reportedBy, followUp } = req.body;

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "Invalid class Id!");
  }

  if (roll == "" || name == "" || studentId == "" || reportedBy == "") {
    throw new AppError(400, "Required all fields!");
  }

  const existingReport = await ClassModel.findOneAndUpdate(
    { _id: classId, "classreport.roll": roll }, // Query to find the document
    {
      $set: {
        "classreport.$.name": name,
        "classreport.$.studentId": studentId,
        "classreport.$.report": report,
        "classreport.$.remark": remark,
        "classreport.$.reportedBy": reportedBy,
        "classreport.$.followUp": followUp,
      },
    },
    { new: true }
  );

  if (!existingReport) {
    const newReport = {
      roll,
      name,
      studentId,
      report,
      remark,
      reportedBy,
      followUp,
    };

    const updatedReport = await ClassModel.findOneAndUpdate(
      { _id: classId },
      { $push: { classreport: newReport } },
      { new: true }
    );

    if (!updatedReport) {
      throw new AppError(404, "No class found by ID!");
    }

    return res.status(200).json({
      success: true,
      message: "Report inserted successfully!",
      updatedReport,
    });
  }

  res.status(200).json({
    success: true,
    message: "Report updated successfully!",
    existingReport,
  });
});

module.exports = {
  createReportController,
};
