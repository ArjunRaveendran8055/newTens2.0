const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { jwtVerifyToken } = require("../utils/jwt");

const authorizeGenuinity = asyncWrapper(async (req, res, next) => {
  const cookie = req.headers.cookie;
  // console.log("cookie",cookie)
  if (!cookie) {
    throw new AppError(400, "Something wrong with Cookies");
  }
  const token = cookie.split("=")[1];
  const user = jwtVerifyToken(token);
  if (!user) {
    throw new AppError(401, "Access Denied");
  }
  console.log("user is :",user)
  res.user=user
  next();
});

module.exports = {
  authorizeGenuinity,
};
