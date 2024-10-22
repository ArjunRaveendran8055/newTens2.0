const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ClassModel } = require("../models/ClassModel");
const mongoose = require("mongoose");
const { StudentModel } = require("../models/StudentModel");
const { ApproveStudentModel } = require("../models/ApproveStudentModel");
const { pipeline } = require("stream");
const {
  fetchAAbasedClasses,
  fetchMentorBasedClasses,
} = require("../helpers/FetchRoleBasedClassess");

const createReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;

  console.log(req.body);
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
    classs,
    syllabus,
    centre,
    batch,
    level,
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
        "classreport.$.class": classs,
        "classreport.$.syllabus": syllabus,
        "classreport.$.centre": centre,
        "classreport.$.batch": batch,
        "classreport.$.level": level,
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
      class: classs,
      syllabus,
      centre,
      batch,
      level,
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



const getReportForClassController= asyncWrapper(async (req, res, next) => {

  const classId = req.params.id;
  const roll = req.query.roll ? req.query.roll.toLowerCase() : "";
  const { id, role } = res.user;
  console.log("id and role", roll);


  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "Invalid class Id!");
  }

  console.log("class id is :", classId);
  const documentId = new mongoose.Types.ObjectId(classId);

  const studentData = await ClassModel.aggregate([
    { $match: { _id: documentId, 'students.roll_no': roll } },
    { $unwind: '$students' },
    { $match: { 'students.roll_no': roll } },
    { $replaceRoot: { newRoot: '$students' } }
  ]);
  






    
    return res.status(200).json({data:studentData})

})






//get all report in that perticular class using classId( tattanam pinned)
const getReportController = asyncWrapper(async (req, res, next) => {
  const classId = req.params.id;
  const roll = req.query.roll ? req.query.roll.toLowerCase() : "";
  const { id, role } = res.user;
  console.log("id and role", id, role);
  const pipeline = [];
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new AppError(400, "Invalid class Id!");
  }

  console.log("class id is :", classId);
  const documentId = new mongoose.Types.ObjectId(classId);

  pipeline.push({
    $match: {
      _id: documentId,
    },
  });

  if (role === "AA") {
    const classes = await fetchAAbasedClasses(id);
    if (classes.length === 0) {
      console.log("kudum");
      throw new AppError(400, "No Data Found!");
    }
    const exactClasses = classes.map((item) => ({
      centre: item.centre,
      class: String(item.class),
      batch: item.batch,
    }));

    //console.log("exact classes:", exactClasses);

    pipeline.push({
      $addFields: {
        classreport: {
          $let: {
            vars: {
              filters: exactClasses,
            },
            in: {
              $cond: {
                if: { $eq: [{ $size: "$$filters" }, 0] },
                then: "$classreport",
                else: {
                  $filter: {
                    input: "$classreport",
                    as: "report",
                    cond: {
                      $in: [
                        {
                          centre: "$$report.centre",
                          class: "$$report.class",
                          batch: "$$report.batch",
                        },
                        "$$filters",
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  if (role === "MENTOR") {
    const classes = await fetchMentorBasedClasses(id);
    if (classes.length === 0) {
      console.log("kudum");
      throw new AppError(400, "No Data Found!");
    }
    const exactClasses = classes.map((item) => ({
      centre: item.centre,
      class: String(item.class),
      batch: item.batch,
    }));

    pipeline.push({
      $addFields: {
        classreport: {
          $let: {
            vars: {
              filters: exactClasses,
            },
            in: {
              $cond: {
                if: { $eq: [{ $size: "$$filters" }, 0] },
                then: "$classreport",
                else: {
                  $filter: {
                    input: "$classreport",
                    as: "report",
                    cond: {
                      $in: [
                        {
                          centre: "$$report.centre",
                          class: "$$report.class",
                          batch: "$$report.batch",
                        },
                        "$$filters",
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  const result = await ClassModel.aggregate(pipeline);

  const reports = {
    ...result[0],
  };

  console.log("result is :", reports);
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
    const roll = req.query.roll ? req.query.roll.toLowerCase() : "";
    let students;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "Invalid ClassId.");
    }

    const result = await ClassModel.findById(id);

    if (!result) {
      throw new AppError(400, "SomeThing wrong with ClassID.");
    } else {
      if (roll) {
        students = await ApproveStudentModel.find({
          syllabus: result.classsyllabus.toLowerCase(),
          class: result.classname,
          roll_no: roll.toLowerCase(),
          level: result.classstream,
        });

        if (students.length == 0) {
          throw new AppError(404, "Invalid Roll Number!");
        }
      } else {
        students = await ApproveStudentModel.find({
          syllabus: result.classsyllabus.toLowerCase(),
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
  const result = await ApproveStudentModel.findByIdAndUpdate(
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
  getReportForClassController
};
