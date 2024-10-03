const { pendingUserController, allUserController, oneUserController, approveUserController, deleteUserByIdController,getAllAAController, createUserController, editUserController, allottedAreas } = require("../controllers/userController")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")
const { userUpload } = require("../utils/multer")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",authorizeGenuinity(),pendingUserController)
userRoutes.get("/allottedAreas",authorizeGenuinity(),allottedAreas)
userRoutes.get("/getAllUserList",authorizeGenuinity(),allUserController)
userRoutes.get("/getAllAA",authorizeGenuinity(),getAllAAController)
userRoutes.get("/getOneUser/:id",authorizeGenuinity(),oneUserController)
userRoutes.post("/CreateNewUser",authorizeGenuinity(),userUpload.single('photo') ,createUserController)
userRoutes.put("/EditUser/:id",authorizeGenuinity(),editUserController)
userRoutes.put("/approveUser/:id",authorizeGenuinity(),approveUserController)
userRoutes.delete("/deleteUser/:id",authorizeGenuinity(),deleteUserByIdController)



module.exports={userRoutes}