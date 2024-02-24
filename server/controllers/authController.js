const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { UserModel } = require("../models/UserModel");
const { comparePass } = require("../utils/bcrypt");
const { jwtSign, jwtVerify } = require("../utils/jsonwebtoken");


//user Login Controller
const LoginController = asyncWrapper(async (req, res, next) => {
  
  const { email, password } = req.body;
  //confirm email and password is received
  if (!email || !password) {
    throw new AppError("enter your credentials.", 400);
  }
  const result = await UserModel.findOne({ email: email });

  //email not match
  if (!result) {
    throw new AppError("Please Register Email First.", 400);
  }

  //check for password matching
  const same = await comparePass(password, result.password);
  if (!same) {
    throw new AppError("Enter Matching Credentials.", 400);
  }
  const token = jwtSign({
    id: result._id,
    email: result.email,
    username: result.username,
    role: result.role,
  });

  let expDate = new Date(Date.now() + 3600000 * 12);
  res
    .status(200)
    .cookie("token", token, {
      expires: expDate,
      httpOnly: true,
      sameSite: "lax",
    })
    .json({ data: result, message: "Login SuccessFul.", success: true });
});

//controller to varify User
const verifyController = asyncWrapper(async (req, res, next) => {
  const cookie = req.headers.cookie;
  //no Cookie found
  if (!cookie) {
    throw new AppError("Athenticate User.", 400);
  }
  //console.log("cookieHeader is:", cookie);
  const token = cookie.split("=")[1];
  const user = jwtVerify(token);

  //not a Valid token
  if (!user) {
    throw new AppError("Your Token Has Expired.", 400);
  }

  //responding userData back
  return res.status(200).json({ data: user, success: true });
});

//controller for refreshToken
const refreshTokenconTroller = asyncWrapper(async (req, res, next) => {
  console.log("dumDum");
  const cookie = req.headers.cookie;

  //no Cookie found
  if (!cookie) {
    throw new AppError("Athenticate User.", 400);
  }
  //console.log("cookieHeader is:",cookie);
  const oldToken = cookie.split("=")[1];
  const user = jwtVerify(oldToken);

  //not a Valid token
  if (!user) {
    throw new AppError("Your Token Has Expired.", 400);
  }
  const token = jwtSign({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  });
  console.log("token is ready for launch");
  let expDate = new Date(Date.now() + 3600000 * 12);
  res
    .status(200)
    .cookie("token", token, {
      expires: expDate,
      httpOnly: true,
      sameSite: "lax",
    })
    .json({ data: user, success: true });
});

module.exports = {
  LoginController,
  verifyController,
  refreshTokenconTroller,
};
