const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");
const { StudentModel } = require("../models/StudentModel");

const createReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  const {
    roll,
    name,
    studentId,
    report,
    remark,
    reportedBy,
    followUp,
    response,
    respondedBy,
  } = req.body;

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
        "classreport.$.response": response,
        "classreport.$.respondedBy": respondedBy,
        "classreport.$.time": new Date(Date.now()),
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
      response,
      respondedBy,
      followUp,
      time: new Date(Date.now()),
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
  const roll = req.query.roll ? req.query.roll.toUpperCase() : "";

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
    const roll = req.query.roll ? req.query.roll.toUpperCase() : "";
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

//add report to ssr report and updating class report
const addMentorResponseController = asyncWrapper(async (req, res, next) => {
  const { studentId, classId, callType, reason, response, handledBy } =
    req.body;
  // console.log(`${studentId + classId + callType + reason + response}`);
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "Invalid class Id!");
  }
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new AppError(400, "Invalid class Id!");
  }
  const reportObj = {
    callType,
    reason,
    response,
    handledBy,
    time: new Date(Date.now()),
  };
  const result = await StudentModel.findByIdAndUpdate(
    { _id: studentId },
    {
      $push: { report: reportObj },
    }
  );
  if (!result) {
    throw new AppError(400, "Report Insertion Failed!");
  }

  const existingReport = await ClassModel.findOneAndUpdate(
    { _id: classId, "classreport.studentId": studentId }, // Query to find the document
    {
      $set: {
        "classreport.$.response": response,
        "classreport.$.respondedBy": handledBy,
      },
    },
    { new: true }
  );
  if (!existingReport) {
    throw new AppError(400, "Report Updation Failed!");
  }
  res.status(200).json({
    ssrReport: result,
    existingReport,
  });
});

module.exports = {
  createReportController,
  getReportController,
  getClassStudentDetailsController,
  addMentorResponseController,
};
