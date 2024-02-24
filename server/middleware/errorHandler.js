const { AppError } = require("../AppError")

const errorHandler=(error,req,res,next)=>{
    
    if(error instanceof AppError){
        return res.status(error.statusCode).json({error:error.message})
    }
    console.log("error is :",error.message);
    return res.status(500).json({error:"Something went Wrong."})
    
}

module.exports={errorHandler}