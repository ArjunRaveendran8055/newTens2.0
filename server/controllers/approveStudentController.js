const { asyncWrapper } = require("../helpers/asyncWrapper");

const staffApprovalController=asyncWrapper(
    async(req,res,next)=>{
        res.status(200).json({msg:"hello hello"})
    }
)

module.exports={
    staffApprovalController
}