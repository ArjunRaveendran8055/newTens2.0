const express =require("express")
const cors=require("cors")
const morgan =require("morgan")
const erroHandler = require("./middleware/errorHandler")
const { authRoutes } = require("./routes/authRoutes")
const { userRoutes } = require("./routes/userRoutes")
const { studentRoutes } = require("./routes/studentRoutes")
const { classRoutes } = require("./routes/classRoute")
const { classReportRoutes } = require("./routes/classReportRoutes")
const { registrationRoutes } = require("./routes/registrationRoutes")
const { centreRouter } = require("./routes/centreRoutes")
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

app.use("/student",studentRoutes)

app.use("/class",classRoutes)

app.use("/classReport",classReportRoutes)

app.use("/registration",registrationRoutes)

app.use("/centre",centreRouter)

app.use(erroHandler)

module.exports={app}







