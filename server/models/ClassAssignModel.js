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
    },
    mentor_id: {
      type: String,
    },
    mentor_name: {
      type: String,
    },
    academic_associate: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ClassAssignModel = mongoose.model("classassign", schema);

module.exports = { ClassAssignModel };
