const mongoose = require("mongoose");

const newclassSchema = new mongoose.Schema(
  {
    tutorname: {
      type: Object,
      required: [true, "tutorname required"],
    },
    classname: {
      type: String,
      required: [true, "classname required"],
    },
    classsession: {
      type: String,
      required: [true, "session is required"],
    },
    classsubject: {
      type: String,
      required: [true, "subject required"],
    },
    classdate: {
      type: Date,
      required: [true, "date required"],
    },
    classexam: {
      type: Boolean,
      default: false,
    },
    classsyllabus: {
      type: String,
      required: [true, "syllabus required"],
    },
    classstream: {
      type: String,
      required: [true, "stream required"],
    },
    students: {
      type: Array,
      required: false,
    },
    classfeed: {
      mainhost: String,
      teacher: String,
      subject: String,
      id_reach: String,
      host_reached: String,
      teacher_reach: String,
      studio_arrangement: String,
      doubt_clearance: String,
      interaction_before_class: String,
      warmup: String,
      break: String,
      dcm_questioned: String,
      poll_question: String,
      exam: String,
      class_start: String,
      class_end: String,
      exam_start: String,
      exam_end: String,
      question_slide: String,
      answer_slide: String,
      remarks: String,
      interaction: String,
      rating: String,
      poll_res: String,
    },
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.model("class", newclassSchema);

module.exports = { ClassModel };
