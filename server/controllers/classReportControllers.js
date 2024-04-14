const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");
const { StudentModel } = require("../models/StudentModel");

const createReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  const { roll, name, studentId, report, remark, reportedBy, followUp } =
    req.body;

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

const getReportController = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const roll = req.query.roll;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid class Id!");
  }

  const reports = await ClassModel.findById(id);

  if (reports) {
    if (roll) {
      const Data = reports.classreport.find((e) => e.roll == roll);
      return res.status(200).json({ success: true, report: Data });
    } else {
      return res
        .status(200)
        .json({ success: true, report: reports.classreport });
    }
  }

  throw new AppError(404, "No Data Found");
});

//student details using class data
const getClassStudentDetailsController = asyncWrapper(
  async (req, res, next) => {
    const { id } = req.params;
    const roll = req.query.roll;
    let students;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "Invalid ClassId.");
    }

    const result = await ClassModel.findById(id);

    if (!result) {
      throw new AppError(400, "SomeThing wrong with ClassID.");
    } else {
      if (roll) {
        students = await StudentModel.find({
          syllabus: result.classsyllabus.toUpperCase(),
          class: result.classname,
          roll_no: roll,
        });

        if (students.length == 0) {
          throw new AppError(404, "Invalid Roll Number!");
        }
      } else {
        students = await StudentModel.find({
          syllabus: result.classsyllabus.toUpperCase(),
          class: result.classname,
        });

        if (students.length == 0) {
          throw new AppError(404, "no Data Found!");
        }
      }

      res.status(200).json({
        data: students,
        success: true,
        message: "student details fetched Successfully.",
      });
    }
  }
);

module.exports = {
  createReportController,
  getReportController,
  getClassStudentDetailsController,
};
