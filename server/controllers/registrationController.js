const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { SchoolModel } = require("../models/SchoolModel");
const mongoose = require("mongoose");

const {RegisteredStudentModel} = require("../models/RegisteredStudentModel");

const getSchoolList = asyncWrapper(async (req, res, next) => {
  const { search, syllabus, abroad } = req.body;
  const regex = new RegExp(search, "i");

  let pipeline = [
    {
      $match: { name: { $regex: regex } },
    },
  ];

  if (syllabus) {
    pipeline.push({
      $match: { syllabus: syllabus },
    });
  }

  pipeline.push({
    $project: {
      _id: 0,
      name: 1,
      location: 1,
    },
  });

  const result = await SchoolModel.aggregate(pipeline);

  if (result.length === 0) {
    throw new AppError(404, "No results found!");
  } else {
    res.status(200).json({ success: true, data: result });
  }
});

const SubmitStudentController = asyncWrapper(async (req, res, next) => {
  // console.log(req.file)
  const recData= JSON.parse(req.body.data);

  console.log(req.file.filename);

  let final = {
    roll_no: recData.rollNumber,
    admission_no: null, // optional field
    student_name: recData.fullName,
    dob: new Date(recData.dob), // Date type, use `new Date()` for current date or `null`
    address: recData.address,
    pin_code: recData.pinCode,
    state : recData.state,
    level : recData.level,
    district: recData.district,
    gender: recData.gender,
    syllabus: recData.syllabus,
    class: recData.class,
    medium: recData.medium,
    school_name: recData.school,
    school_location: recData.schoolLocation,
    father: recData.fatherName,
    mother: recData.motherName,
    fathers_occupation: recData.fatherOccupation,
    mothers_occupation: recData.motherOccupation,
    father_no: recData.fatherNumber,
    mother_no: recData.motherNumber,
    whatsapp: recData.whatsappNumber,
    email: recData.email,
    siblings: recData.siblings, // optional field, empty array by default
    difficult_subjects: recData.difficultSubjects, // optional field
    remark: "nothing",
    academic_status: recData.academicStatus,
    referral_source: recData.hearAbout,
    image: req.file ? req.file.filename : null, // optional field
    centre: recData.centre,
    report: [], // optional field, empty array by default
    active_status: false, // default value
    student_status: false, // default value
  };

  console.log(final)

  const newStudent = new RegisteredStudentModel({
   ...final
  });

  const registeredResult = await newStudent.save();


  res.status(200).json({ success: true, data: registeredResult });
});

module.exports = {
  getSchoolList,
  SubmitStudentController,
};
