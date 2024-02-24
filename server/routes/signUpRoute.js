const { signUpController, activateUserController } = require("../controllers/signUpController");
const { proPicUpload } = require("../utils/multer");

const signUpRoute = require("express").Router();

signUpRoute.post("/createUser", proPicUpload.single('file'), signUpController);

signUpRoute.post("/activateUser/:activationToken",activateUserController)

module.exports = { signUpRoute };
