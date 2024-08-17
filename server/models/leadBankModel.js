const mongoose = require("mongoose");

const leadBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    whatsapp:{
      type:String,
      required:false
    },
    class: {
      type: String,
      required: false,
    },
    year:{
      type:String,
      default: new Date().getFullYear()
    },
    division: {
      type: String,
      required: false,
    },
    syllabus: {
      type: String,
      required: false,
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
