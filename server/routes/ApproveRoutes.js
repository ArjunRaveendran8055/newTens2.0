const express=require("express")
const { staffApprovalController, staffApprovalWithPhotoController } = require("../controllers/approveStudentController")
const { StudentModel } = require("../models/StudentModel")
const { studentUpload } = require("../utils/multer")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")

const approveRouter=express.Router()


approveRouter.post("/staffApproval",authorizeGenuinity(),staffApprovalController)

approveRouter.post("/staffApprovalWithPhoto",studentUpload.single("file"),staffApprovalWithPhotoController)


module.exports={approveRouter}
