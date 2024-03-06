const { pendingUserController, allUserController, oneUserController, approveUserController, deleteUserByIdController } = require("../controllers/userController")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",pendingUserController)
userRoutes.get("/getAllUserList",allUserController)
userRoutes.get("/getOneUser/:id",oneUserController)
userRoutes.put("/approveUser/:id",approveUserController)
userRoutes.delete("/deleteUser/:id",deleteUserByIdController)



module.exports={userRoutes}