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
        required: false,
      },
    syllabus: {
        type: String,
        required: [true, "district is required"],
      },
      state: {
        type: String,
        required: false,
      },
   
  },
  {
    timestamps: true,
  }
);


schoolSchema.pre("save", function (next) {
  for (let key in this._doc) {
    if (typeof this._doc[key] === "string") {
      this._doc[key] = this._doc[key].toLowerCase();
    }
  }
  next();
});

const SchoolModel = mongoose.model("schools", schoolSchema);

module.exports = {
    SchoolModel,
  };