const express=require("express")
const { staffApprovalController, staffApprovalWithPhotoController } = require("../controllers/approveStudentController")
const { StudentModel } = require("../models/StudentModel")
const { studentUpload } = require("../utils/multer")

const approveRouter=express.Router()

approveRouter.post("/staffApproval",staffApprovalController)

approveRouter.post("/staffApprovalWithPhoto",studentUpload.single("file"),staffApprovalWithPhotoController)


module.exports={approveRouter}
