const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "tutorname required"],
    },
    incharge: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const CentreModel = mongoose.model("centres", schema);

module.exports = { CentreModel };
