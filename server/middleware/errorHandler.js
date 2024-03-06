const { AppError } = require("../AppError")

const erroHandler=(error,req,res,next)=>{
    
    if(error instanceof AppError){
        return res.status(error.statusCode).json({success:false,error:error.message})
    }
    console.log(error.message);
    return res.status(500).json({error:"Internal Server Error"})
    
}

module.exports=erroHandler