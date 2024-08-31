const { AppError } = require("../AppError");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const { jwtVerifyToken } = require("../utils/jwt");

const authorizeGenuinity = (allowedRoles = []) => {
  return asyncWrapper(async (req, res, next) => {
    const cookie = req.headers.cookie;

    if (!cookie) {
      throw new AppError(400, "Something wrong with Cookies");
    }

    const token = cookie.split("=")[1];
    const user = jwtVerifyToken(token);

    if (!user) {
      throw new AppError(401, "Access Denied");
    }

    // Check if the route requires role-based authorization
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      throw new AppError(403, "You do not have permission to perform this action");
    }

    res.user = user; // Attach user to the response object for use in next middleware/controller
    next();
  });
};


module.exports = {
  authorizeGenuinity,
};
