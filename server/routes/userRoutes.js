const { pendingUserController, allUserController, oneUserController } = require("../controllers/userController")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",pendingUserController)
userRoutes.get("/getAllUserList",allUserController)
userRoutes.get("/getOneUser/:id",oneUserController)


module.exports={userRoutes}