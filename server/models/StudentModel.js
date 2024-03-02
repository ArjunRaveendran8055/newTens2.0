const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
    student_name: {
        type:String,
        required:[true,"student name required"]
    },
    gender: String,
    class: String,
    image: String,
    address: String,
    school: String,
    medium: String,
    school_location: String,
    district: String,
    father: String,
    report: Array,
    roll_no: {
      type: String,
      unique: true
    },
    father_no: String,
    mother_no: String,
    whatsapp: String,
    centre: String,
  });
  