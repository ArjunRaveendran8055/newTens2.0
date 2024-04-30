const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    district: {
        type: String,
        required: [true, "district is required"],
      },
    syllabus: {
        type: String,
        required: [true, "district is required"],
      },
      state: {
        type: String,
        required: [true, "state is required"],
      },
   
  },
  {
    timestamps: true,
  }
);

const SchoolModel = mongoose.model("schools", schoolSchema);

module.exports = {
    SchoolModel,
  };