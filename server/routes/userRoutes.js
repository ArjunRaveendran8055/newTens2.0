const { pendingUserController, allUserController, oneUserController, approveUserController, deleteUserByIdController,getAllAAController } = require("../controllers/userController")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",authorizeGenuinity,pendingUserController)
userRoutes.get("/getAllUserList",authorizeGenuinity,allUserController)
userRoutes.get("/getAllAA",authorizeGenuinity,getAllAAController)
userRoutes.get("/getOneUser/:id",authorizeGenuinity,oneUserController)
userRoutes.put("/approveUser/:id",authorizeGenuinity,approveUserController)
userRoutes.delete("/deleteUser/:id",authorizeGenuinity,deleteUserByIdController)



module.exports={userRoutes}