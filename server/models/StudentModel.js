const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  roll_no: {
    type: String,
    required: [true, "roll number required"],
  },
  student_name: {
    type: String,
    required: [true, "student name required"],
  },
  gender: {
    type: String,
    required: [true, "gender required"],
  },
  address: {
    type: String,
    required: [true, "address required"],
  },
  class: {
    type: String,
    required: [true, "class required"],
  },
  syllabus: {
    type: String,
    required: [true, "syllabus required"],
  },
  student_status: {
    type: Boolean,
    default: true,
  },
  medium: {
    type: String,
    required: [true, "medium required"],
  },
  school_name: {
    type: String,
    required: [true, "school name required"],
  },

  school_location: {
    type: String,
    required: [true, "school location required"],
  },
  district: {
    type: String,
    required: [true, "district is required"],
  },
  report: Array,
  father: {
    type: String,
    required: [true, "father name required"],
  },
  father_no: {
    type: String,
    required: [true, "father's number required"],
  },
  mother_no: {
    type: String,
    required: [true, "mother's number requried"],
  },
  centre: {
    type: String,
    required: [true, "center required"],
  },
  whatsapp: {
    type: String,
    required: [true, "whatsapp number requrired"],
  },
  pin_code:{
    type:String,
    required:[true,"pincode required"]
  },
  image:{
    type:String,
    required:false
  }
});


const StudentModel=mongoose.model("students",studentSchema)


module.exports={StudentModel}