const express=require("express")
const { staffApprovalController } = require("../controllers/approveStudentController")
const { StudentModel } = require("../models/StudentModel")

const approveRouter=express.Router()

approveRouter.post("/staffApproval",staffApprovalController)


module.exports={approveRouter}
