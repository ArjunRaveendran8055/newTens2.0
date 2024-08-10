const mongoose = require("mongoose");

const leadBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    class: {
      type: String,
      required: [true, "class is required"],
    },
    division: {
      type: String,
      required: [true, "Batch is required"],
    },
    syllabus: {
      type: String,
      required: [true, "syllabus is required"],
    },
    district: {
      type: String,
      required: false,
    },
    schoolName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

leadBankSchema.pre("save", function (next) {
  for (let key in this._doc) {
    if (typeof this._doc[key] === "string") {
      this._doc[key] = this._doc[key].toLowerCase();
    }
  }
  next();
});

const leadBankModel=mongoose.model("leadbank",leadBankSchema)

module.exports={
    leadBankModel
}
