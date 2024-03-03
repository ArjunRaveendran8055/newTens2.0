const { pendingUserController } = require("../controllers/userController")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",pendingUserController)

module.exports={userRoutes}