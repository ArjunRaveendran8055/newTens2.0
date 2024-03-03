const { AppError } = require("../AppError");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const { encryptPassword, comparePassword } = require("../utils/bcrypt");
const {
  activationJwt,
  actionvationVerify,
  jwtSign,
  jwtVerifyToken,
} = require("../utils/jwt");
const { sendMail } = require("../utils/nodeMailer");

const signUpController = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, dob } = req.body;

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
    dob: dob,
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
 // console.log("decoded user is: ", user);
  if (!user) {
    throw new AppError(400, "Token Has Expired.");
  }

  //checking wheather the account already activated.
  const result = await UserModel.findOne({ email: user.email });
  //console.log("result is :", result);
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
    dob: user.dob,
  });

  const data = await new_user.save();
  if (!data) {
    throw new AppError(400, "Activation Failed.");
  }
  return res.status(200).json({ message: "Account Activation SuccessFul." });
});

//loginController
const loginController = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  //to check if the email is add to the collection
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(400, "Please Register First.");
  }
  //to check weather the password is matching
  const same = comparePassword(password, user.password);
  if (!same) {
    throw new AppError(400, "Enter Valid Credentials");
  }
  if (user.activestatus === false) {
    throw new AppError(400, "Ask Admin to Verify Account");
  }

  //signing jwttoKen using UserDefined Function
  const token = jwtSign({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    dob: user.dob,
  });
  let expDate = new Date(Date.now() + 3600000 * 12);
  res
    .status(200)
    .cookie("token", token, {
      expires: expDate,
      sameSite: "lax",
      httpOnly: true,
    })
    .json({ data: user.firstname, message: "Login SuccessFul", success: true });
});

//cookieUserVerificationController
const verifyUserController = asyncWrapper(async (req, res, next) => {
  //console.log("ippa sheriyakki thara..");
  const cookie = req.headers.cookie;
  if(!cookie){
    throw new AppError(400,"Something wrong With Cookie")
  }
  const token = cookie.split("=")[1];
  //console.log(token);
  const user = jwtVerifyToken(token);
  if (!user) {
    throw new AppError(400, "Please Login And Try Again");
  }
  //console.log("user is:",user)
  res.status(200).json({ data: user, success: true });
});

const refreshTokenController = asyncWrapper(async (req, res, next) => {
  const cookie = req.headers.cookie;
  if(!cookie){
    throw new AppError(400,"Something wrong With Cookie")
  }
  const token = cookie.split("=")[1];
  const user = jwtVerifyToken(token);
  if (!user) {
    throw new AppError(400, "something wrong with Authentication");
  }
  res.user = user;
  next();
});

const refreshTokenGenerator = asyncWrapper(async (req, res, next) => {
  const { user } = res;
  const token = jwtSign({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    dob: user.dob,
  });
  let expDate = new Date(Date.now() + 3600000 * 12);
  res.status(200).cookie("token",token,{
    expires:expDate,
    sameSite:"lax",
    httpOnly:true
  }).json({data:user})
});

module.exports = {
  signUpController,
  activationController,
  loginController,
  verifyUserController,
  refreshTokenController,
  refreshTokenGenerator,
};
