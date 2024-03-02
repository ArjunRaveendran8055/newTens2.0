const {
  signUpController,
  activationController,
  loginController,
  verifyUserController,
  refreshTokenController,
  refreshTokenGenerator,
} = require("../controllers/authControllers");

const authRoutes = require("express").Router();

authRoutes.post("/signUp", signUpController);

authRoutes.post("/activation", activationController);

authRoutes.post("/login", loginController);

authRoutes.get("/verifyUser", verifyUserController);

authRoutes.get("/refreshToken",refreshTokenController,refreshTokenGenerator)

module.exports = {
  authRoutes,
};
