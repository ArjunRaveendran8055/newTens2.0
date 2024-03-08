const mongoose = require("mongoose");

const newclassSchema = new mongoose.Schema(
  {
    tutorname:  {
      type: String,
      required: [true, "tutorname required"],
    },
    classname:  {
      type: String,
      required: [true, "classname required"],
    },
    classsubject: {
      type: String,
      required: [true, "subject required"],
    },
    classdate:  {
      type: String,
      required: [true, "date required"],
    },
    classexam: {
      type: Boolean,
      default :false
    },
    classsyllabus:  {
      type: String,
      required: [true, "syllabus required"],
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
    classatt: {
      time: Number,
      attendance_list: [
        {
          name: String,
          roll: {
            type: String,
          },
          time: Number,
          centre: String,
          uploadedby: String,
        },
      ],
    },
    classlate: Object,
    classreport: Array,
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.model("class", newclassSchema );

module.exports = {ClassModel}