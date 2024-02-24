const {
  LoginController, verifyController, refreshTokenconTroller,

} = require("../controllers/authController");

const authRoute = require("express").Router();

authRoute.post("/login", LoginController);

authRoute.get("/verify", verifyController);
authRoute.get("/refreshToken",refreshTokenconTroller);

module.exports = { authRoute };
