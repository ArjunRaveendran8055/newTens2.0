const { asyncWrapper } = require("../helpers/asyncWrapper");
const fs = require("fs");
const { UserModel } = require("../models/UserModel");
const { AppError } = require("../AppError");
const {
  jwtSign,
  jwtUserActivation,
  jwtUserActivationVerify,
} = require("../utils/jsonwebtoken");
const { sendMail } = require("../utils/NodeMailer");
const { encryptPass } = require("../utils/bcrypt");


const signUpController = asyncWrapper(async (req, res, next) => {
  // console.log("hello world...")
  // console.log(req.file)
  // console.log(req.file.filename)
  const { filename } = req.file;
  const { email, password, username } = req.body;
  console.log(email, "aan email kittane");
  const result = await UserModel.findOne({ email: email });
  if (result) {
    console.log("user already und kutta..", result);
    const fileName = req.file.filename;
    const filePath = req.file.destination;
    const item = `${filePath}/${fileName}`;
    fs.unlink(item, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error Deleting File." });
      }
    });
    throw new AppError("User Already Exist", 400);
  }

  const user = {
    email: email,
    password: password,
    username: username,
    avatar: filename,
  };

  const activationToken = jwtUserActivation(user);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;
  // console.log("activation url is",activationUrl)

  await sendMail({
    email: user.email,
    subject: `! ACOUNT ACTIVATION !`,
    text: `\nFollow the link given below to Activate Your account: \n\n${activationUrl}`,
  }).then(() => {
    console.log("mail send aayitundavanam");
    res.status(200).json({
      success: true,
      message: "Please check Your Email to Activate Your Account",
    });
  });
});

const activateUserController = asyncWrapper(async (req, res, next) => {
  
  const { activationToken } = req.params;
  const user = jwtUserActivationVerify(activationToken);
  if (!user) {
    throw new AppError("Your Token Has Expired.", 400);
  }

  const result = await UserModel.findOne({ email: user.email });
  
  if (result) {
   throw new AppError("User Already Verified.",400)
  }
  



  const hashPass = encryptPass(user.password);

  const updatedUser = {
    email: user.email,
    password: hashPass,
    active: true,
    role: "buyer",
    username: user.username,
    avatar: user.avatar,
  };
  const results = await UserModel.insertMany(updatedUser);
  console.log("length of results:",results.length);
  if (results.length===0) {
     throw new AppError("Account Already Activated",400)
  }
  return res.status(200).json({message:"Account Activation SuccessFul."})
 });

module.exports = { signUpController, activateUserController }
