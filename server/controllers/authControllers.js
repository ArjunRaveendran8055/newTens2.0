const { AppError } = require("../AppError");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const { encryptPassword } = require("../utils/bcrypt");
const { activationJwt, actionvationVerify } = require("../utils/jwt");
const { sendMail } = require("../utils/nodeMailer");

const signUpController = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password,dob } = req.body;

  if (!firstName || !lastName || !email || !password || !dob) {
    throw new AppError(400, "Enter Complete Details");
  }

  //check if the user existed
  const result = await UserModel.findOne({ email });
  if (result) {
    throw new AppError(400, "User already Registered.");
  }

  const obj = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
    dob:dob
  };

  //creating token for mail verification
  const activationToken = activationJwt(obj);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  //sending mail using nodeMailer
  sendMail({
    email: email,
    subject: "!!! ACTIVATE YOUR ACCOUNT !!!",
    text: `click the link below to activate your account  ${activationUrl}`,
  })
    .then(() => {
      console.log("mail sent successfully.");
      return res
        .status(200)
        .json({ message: "Check mail to Activate Account." });
    })
    .catch(() => {
      console.log("error sending mail.");
      throw new AppError(400, "error sending Mail");
    });
});

//activationController
const activationController = asyncWrapper(async (req, res, next) => {
  console.log("hai");
  const { activationToken } = req.body;

  //checking validity of the token
  const user = actionvationVerify(activationToken);
  console.log("decoded user is: ", user);
  if (!user) {
    throw new AppError(400, "Token Has Expired.");
  }

  //checking wheather the account already activated.
  const result = await UserModel.findOne({ email: user.email });
  console.log("result is :", result);
  if (result) {
    throw new AppError(400, "Account Already Activated.");
  }

  //bcrypt custfunction for hashing password
  const hashPass = encryptPassword(user.password);
  const new_user = new UserModel({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: hashPass,
    dob:user.dob
  });

  const data = await new_user.save();
  if (!data) {
    throw new AppError(400, "Activation Failed.");
  }
  return res.status(200).json({ message: "Account Activation SuccessFul." });
});

module.exports = {
  signUpController,
  activationController,
};
