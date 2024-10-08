const { pendingUserController,getTutorsByNameController, allUserController,terminateUserController,approveUserStatusController, oneUserController, approveUserController, deleteUserByIdController,getAllAAController, createUserController, editUserController, allottedAreas } = require("../controllers/userController")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")
const { userUpload } = require("../utils/multer")

const userRoutes=require("express").Router()


userRoutes.get("/getPendingUserList",authorizeGenuinity(),pendingUserController)
userRoutes.get("/allottedAreas",authorizeGenuinity(),allottedAreas)
userRoutes.get("/getAllUserList",authorizeGenuinity(),allUserController)
userRoutes.get("/getAllAA",authorizeGenuinity(),getAllAAController)
userRoutes.get("/getOneUser/:id",authorizeGenuinity(),oneUserController)
userRoutes.post("/CreateNewUser",authorizeGenuinity(),userUpload.single('photo') ,createUserController)
userRoutes.put("/EditUser/:id",authorizeGenuinity(),userUpload.single('photo'),editUserController)
userRoutes.put("/approveUser/:id",authorizeGenuinity(),approveUserController)
userRoutes.delete("/deleteUser/:id",authorizeGenuinity(),deleteUserByIdController)
userRoutes.post("/terminateUser",authorizeGenuinity(),terminateUserController)
userRoutes.post("/approveStatus",authorizeGenuinity(),approveUserStatusController)
userRoutes.get("/getAllTutors",authorizeGenuinity(),getTutorsByNameController)



module.exports={userRoutes}