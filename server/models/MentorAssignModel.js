const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    centre: {
      type: String,
    },
    class: {
      type: String,
      
    },
    batch: {
      type: String,
      required: [true, "subject required"],
    },
    mentor_id: {
      type: String,
      required: [true, "date required"],
    },
    mentor_name: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MentorAssignModel = mongoose.model("mentorsandbatchs", schema);

module.exports = { MentorAssignModel };
