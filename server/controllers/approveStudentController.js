const { asyncWrapper } = require("../helpers/asyncWrapper");
const mongoose = require("mongoose");
const { ApproveStudentModel } = require("../models/ApproveStudentModel");
const { AppError } = require("../AppError");
const { RegisteredStudentModel } = require("../models/RegisteredStudentModel");
const fs = require("fs");
const { sendMail } = require("../utils/nodeMailer");

const staffApprovalController = asyncWrapper(async (req, res, next) => {
  const { formData } = req.body;
  console.log("vanna formData is:", formData);
  const _id = formData._id;
  let updatedDetails = {
    student_name: formData.fullName,
    gender: formData.gender,
    address: formData.address,
    pin_code: formData.pinCode,
    dob: new Date(formData.dob), // Date type, use `new Date()` for current date or `null`
    email: formData.email,
    class: formData.class,
    syllabus: formData.syllabus,
    school_name: formData.school,
    school_location: formData.schoolLocation,
    medium: formData.medium,
    district: formData.district,
    state: formData.state,
    country: formData.country,
    level: formData.level,
    father: formData.fatherName,
    mother: formData.motherName,
    fathers_occupation: formData.fatherOccupation,
    mothers_occupation: formData.motherOccupation,
    roll_no: formData.rollNumber,
    father_no: formData.fatherNumber,
    mother_no: formData.motherNumber,
    whatsapp: formData.whatsappNumber,
    centre: formData.centre,
    approveStatus: true,
  };

  if (!mongoose.Types.ObjectId.isValid(formData._id)) {
    throw new AppError(400, "Not a Valid User");
  }

  const updatedUser = await RegisteredStudentModel.findByIdAndUpdate(
    _id,
    updatedDetails,
    { new: true }
  );
  if (!updatedUser) {
    throw new AppError(400, "Student Updation Failed!");
  }

  const result = await RegisteredStudentModel.aggregate([
    {
      $match: {
        _id: updatedUser._id,
      },
    },
    {
      $project: {
        _id: 0,
        roll_no: 1,
        admission_no: 1,
        student_name: 1,
        dob: 1,
        address: 1,
        pin_code: 1,
        district: 1,
        gender: 1,
        level: 1,
        syllabus: 1,
        class: 1,
        country: 1,
        state: 1,
        medium: 1,
        school_name: 1,
        school_location: 1,
        father: 1,
        mother: 1,
        fathers_occupation: 1,
        mothers_occupation: 1,
        father_no: 1,
        mother_no: 1,
        whatsapp: 1,
        email: 1,
        siblings: 1,
        difficult_subjects: 1,
        remark: 1,
        academic_status: 1,
        referral_source: 1,
        image: 1,
        centre: 1,
        responseId: 1,
        report: 1,
        active_status: 1,
        student_status: 1,
      },
    },
  ]);

  if (result.length === 0) {
    throw new AppError(404, "Something went Wrong!");
  }
  const batch = formData.rollNumber.charAt(1);
  const realStudent = { ...result[0], batch };
  const newApprovedStudent = new ApproveStudentModel(realStudent);
  const approvedResult = await newApprovedStudent.save();
  //   console.log("approved result is", approvedResult);
  if (!approvedResult) {
    throw new AppError(500, "Approval Failed!");
  }
   //sending mail using nodeMailer
   sendMail({
    email: approvedResult.email,
    subject: "NEW10S APPROVE CONFIRMATION",
    text: `Dear ${approvedResult.student_name}, \n \t\t\t\t\t From now you are a student at New10s EduTech Private Limited.\n\nContact Details\nMentor Name: Simi VK\nContact Number:9446722008`,
  })
    .then(() => {
      console.log("mail sent successfully.");
      return res
        .status(200)
        .json({approvedResult, mailsend:true });
    })
    .catch(() => {
      console.log("error sending mail.");
      return res
        .status(200)
        .json({approvedResult, mailSend:false });
    });
    res
      .status(200)
      .json({ id, approvedStudent: approvedResult, success: true });
});

const staffApprovalWithPhotoController = asyncWrapper(
  async (req, res, next) => {
    const { filename } = req.file;
    const { destination } = req.file;
    console.log("veryGood", destination);
    const formData = JSON.parse(req.body.formData);
    console.log("received form data is", formData._id);
    const id = formData._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "Not a Valid User");
    }
    const prevData = await RegisteredStudentModel.findOne({ _id: id });
    console.log("previous student data is:", prevData);
    if (!prevData) {
      throw new AppError(404, "Some Error Occur!");
    }
    const prevFile = prevData.image;
    const item = `${destination}/${prevFile}`;
    fs.unlink(item, (err) => {
      if (err) console.log(err.message);
    });
    let updatedDetails = {
      student_name: formData.fullName,
      gender: formData.gender,
      address: formData.address,
      pin_code: formData.pinCode,
      dob: new Date(formData.dob), // Date type, use `new Date()` for current date or `null`
      email: formData.email,
      class: formData.class,
      syllabus: formData.syllabus,
      school_name: formData.school,
      school_location: formData.schoolLocation,
      medium: formData.medium,
      district: formData.district,
      state: formData.state,
      country: formData.country,
      level: formData.level,
      father: formData.fatherName,
      mother: formData.motherName,
      fathers_occupation: formData.fatherOccupation,
      mothers_occupation: formData.motherOccupation,
      roll_no: formData.rollNumber,
      father_no: formData.fatherNumber,
      mother_no: formData.motherNumber,
      whatsapp: formData.whatsappNumber,
      centre: formData.centre,
      image: filename,
      approveStatus: true,
    };
    const updatedUser = await RegisteredStudentModel.findByIdAndUpdate(
      { _id: id },
      updatedDetails,
      { new: true }
    );
    if (!updatedUser) {
      throw new AppError(400, "Student Updation Failed!");
    }
    const result = await RegisteredStudentModel.aggregate([
      {
        $match: {
          _id: updatedUser._id,
        },
      },
      {
        $project: {
          _id: 0,
          roll_no: 1,
          admission_no: 1,
          student_name: 1,
          dob: 1,
          address: 1,
          pin_code: 1,
          district: 1,
          gender: 1,
          level: 1,
          syllabus: 1,
          class: 1,
          country: 1,
          state: 1,
          medium: 1,
          school_name: 1,
          school_location: 1,
          father: 1,
          mother: 1,
          fathers_occupation: 1,
          mothers_occupation: 1,
          father_no: 1,
          mother_no: 1,
          whatsapp: 1,
          email: 1,
          siblings: 1,
          difficult_subjects: 1,
          remark: 1,
          academic_status: 1,
          referral_source: 1,
          image: 1,
          centre: 1,
          responseId: 1,
          report: 1,
          active_status: 1,
          student_status: 1,
        }, 
      },
    ]);

    if (result.length === 0) {
      throw new AppError(404, "Something went Wrong!");
    }
    const batch = formData.rollNumber.charAt(1);
    const realStudent = { ...result[0], batch };

    const newApprovedStudent = new ApproveStudentModel(realStudent);
    const approvedResult = await newApprovedStudent.save();
    if (!approvedResult) {
      throw new AppError(500, "Approval Failed!");
    }
     //sending mail using nodeMailer
  sendMail({
    email: approvedResult.email,
    subject: "NEW10S APPROVE CONFIRMATION",
    text: `Dear ${approvedResult.student_name}, \n \t\t\t\t\t From now you are a student at New10s EduTech Private Limited.\n\nContact Details\nMentor Name: Simi VK\nContact Number:9446722008`,
  })
    .then(() => {
      console.log("mail sent successfully.");
      return res
        .status(200)
        .json({approvedResult, mailsend:true });
    })
    .catch(() => {
      console.log("error sending mail.");
      return res
        .status(200)
        .json({approvedResult, mailSend:false });
    });
    res
      .status(200)
      .json({ id, approvedStudent: approvedResult, success: true });
  }
);

module.exports = {
  staffApprovalController,
  staffApprovalWithPhotoController,
};
