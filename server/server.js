const { connectDb } = require("./DB/connectDb");
const { app } = require("./app");


//unhandled exceptions
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    console.log(`server shutting down due to unCaughtException : ${err.message}`);
    process.exit(0)
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })    
}



//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(err.message);
    console.log(`server shutting down due to unHandledRejection : ${err.message}`);
    process.exit(0)
})

const PORT=process.env.PORT || 8055

const startServer = async ()=>{
    try {
        //connecting mongoDbase
        connectDb(process.env.MONGO)
        
        //creating port
        app.listen(PORT, ()=>{
            console.log(`Server running at secured Port : ${PORT}`);
        })
    } catch (error) {
       console.log(error.message)
    }
    }

    startServer()