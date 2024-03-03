const express =require("express")
const cors=require("cors")
const morgan =require("morgan")
const erroHandler = require("./middleware/errorHandler")
const { authRoutes } = require("./routes/authRoutes")
const { userRoutes } = require("./routes/userRoutes")
const app=express()


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/auth",authRoutes)

app.use("/user",userRoutes)








app.use(erroHandler)

module.exports={app}







