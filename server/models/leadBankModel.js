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
    whatsapp:{
      type:String,
      required:false
    },
    class: {
      type: String,
      required: [true, "class is required"],
    },
    year:{
      type:String,
      default: new Date().getFullYear()
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
    school: {
      type: String,
      required: false,
    },
    location:{
      type:String,
      required:false
    },
    addedByUserId:{
      type:String,
      required:false
    },
    addByUserName:{
      type:String,
      required:false
    }
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

leadBankSchema.pre("insertMany", function (next, docs) {
  docs.forEach(doc => {
    for (let key in doc) {
      if (typeof doc[key] === "string") {
        doc[key] = doc[key].toLowerCase();
      }
    }
  });
  next();
});

const leadBankModel=mongoose.model("leadbank",leadBankSchema)

module.exports={
    leadBankModel
}
