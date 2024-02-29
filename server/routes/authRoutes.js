const { signUpController, activationController } = require("../controllers/authControllers")

const authRoutes=require("express").Router()

authRoutes.post("/signUp",signUpController)

authRoutes.post("/activation",activationController)

module.exports={
    authRoutes
}