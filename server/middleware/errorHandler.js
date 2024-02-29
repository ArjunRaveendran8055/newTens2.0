const { AppError } = require("../AppError")

const erroHandler=(error,req,res,next)=>{
    
    if(error instanceof AppError){
        return res.status(error.statusCode).json({error:error.message})
    }

    return res.status(500).json({error:"Internal Server Error"})
}

module.exports=erroHandler