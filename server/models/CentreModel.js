const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    centrename: {
      type: String,
      required: [true, "centreName required"],
    },
    tag:{
      type:String,
      required: [true, "Tag required"],
    },
    classes:{
      type:Array,
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
