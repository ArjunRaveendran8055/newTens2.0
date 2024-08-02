const { asyncWrapper } = require("../helpers/asyncWrapper");
const { ApproveStudentModel } = require("../models/ApproveStudentModel");

const staffApprovalController=asyncWrapper(
    async(req,res,next)=>{
        res.status(200).json({msg:"hello hello"})
        
    }
)

module.exports={
    staffApprovalController
}