const {
  signUpController,
  activationController,
  loginController,
  verifyUserController,
  refreshTokenController,
  refreshTokenGenerator,
  logOutController,
} = require("../controllers/authControllers");

const authRoutes = require("express").Router();

authRoutes.post("/signUp", signUpController);

authRoutes.post("/activation", activationController);

authRoutes.post("/login", loginController);

authRoutes.get("/verifyUser", verifyUserController);

authRoutes.get("/refreshToken", refreshTokenController, refreshTokenGenerator);

authRoutes.get("/logout", logOutController);

module.exports = {
  authRoutes,
};
