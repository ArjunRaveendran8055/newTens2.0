const mongoose = require("mongoose");

const ApprovedStudentSchema = new mongoose.Schema(
  {
    roll_no: {
      type: String,
      required: [true, "roll number required"],
    },
    batch: {
      type: String,
      default: "",
      required: false,
    },
    admission_no: {
      type: Number,
      required: false,
    },
    student_name: {
      type: String,
      required: [true, "student name required"],
    },
    dob: {
      type: Date,
      required: [true, "DOB required"],
    },
    address: {
      type: String,
      required: [true, "address required"],
    },
    pin_code: {
      type: String,
      required: [true, "pincode required"],
    },
    district: {
      type: String,
      required: [true, "district is required"],
    },
    gender: {
      type: String,
      required: [true, "gender required"],
    },
    level: {
      type: String,
      required: [true, "level required"],
    },
    syllabus: {
      type: String,
      required: [true, "syllabus required"],
    },
    class: {
      type: String,
      required: [true, "class required"],
    },

    country: {
      type: String,
      required: [true, "country required"],
    },

    state: {
      type: String,
      required: [true, "state required"],
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
    father: {
      type: String,
      required: [true, "father name required"],
    },
    mother: {
      type: String,
      required: [true, "mother name required"],
    },
    fathers_occupation: {
      type: String,
      required: [true, "father's occupation required"],
    },
    mothers_occupation: {
      type: String,
      required: [true, "mother's occupation required"],
    },
    father_no: {
      type: String,
      required: [true, "father's number required"],
    },
    mother_no: {
      type: String,
      required: [true, "mother's number requried"],
    },
    whatsapp: {
      type: String,
      required: [true, "whatsapp number requrired"],
    },
    email: {
      type: String,
      required: [true, "email requrired"],
    },
    siblings: {
      type: Array,
      required: false,
    },
    difficult_subjects: {
      type: Array,
      required: false,
    },
    remark: {
      type: String,
      required: false,
    },
    academic_status: {
      type: String,
      required: [true, "academic status requrired"],
    },
    referral_source: {
      type: String,
      required: [true, "source requrired"],
    },
    image: {
      type: String,
      required: false,
    },
    centre: {
      type: String,
      default: "",
    },
    responseId: {
      type: String,
      required: [true, "responseId required"],
    },
    session: {
      type: String,
      required: [true, "session is required"],
    },
    report: Array,
    attendance: Array,
    marks: Array,
    informedData:Array,
    active_status: {
      type: Boolean,
      default: true,
    },
    student_status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // This adds `createdAt` and `updatedAt` fields
  }
);

ApprovedStudentSchema.pre("save", function (next) {
  for (let key in this._doc) {
    if (typeof this._doc[key] === "string" && this._doc[key] != "image") {
      this._doc[key] = this._doc[key].toLowerCase();
    }
  }
  next();
});

const ApproveStudentModel = mongoose.model(
  "approvedstudents",
  ApprovedStudentSchema
);

module.exports = { ApproveStudentModel };
