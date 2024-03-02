const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      default: "TA",
    },
    dob:{
      type:String,
      required:[true,"dateOfBirth is required"]
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: Array,
      required: false,
    },
    contactnumber:{
      type:String,
      required:false
    },
    gender:{
      type:String,
      required:false
    },
    activestatus: {
      type: Boolean,
      default: false,
    },
    lastpasswordreset: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
