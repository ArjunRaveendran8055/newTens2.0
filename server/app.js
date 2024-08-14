const express =require("express")
const cors=require("cors")
const morgan =require("morgan")
const path=require("path")
const erroHandler = require("./middleware/errorHandler")
const { authRoutes } = require("./routes/authRoutes")
const { userRoutes } = require("./routes/userRoutes")
const { studentRoutes } = require("./routes/studentRoutes")
const { classRoutes } = require("./routes/classRoute")
const { classReportRoutes } = require("./routes/classReportRoutes")
const { registrationRoutes } = require("./routes/registrationRoutes")
const { centreRouter } = require("./routes/centreRoutes")
const { approveRouter } = require("./routes/ApproveRoutes")
const { leadBankRouter } = require("./routes/leadBankRoutes")
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "./config/.env",
    });
  }

  const URL=process.env.CLIENT_URL
  

const app=express()
app.use(cors({
    origin:[URL],
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/uploads",express.static(path.join(__dirname,'uploads')))

app.use("/auth",authRoutes)

app.use("/user",userRoutes)

app.use("/student",studentRoutes)

app.use("/class",classRoutes)

app.use("/classReport",classReportRoutes)

app.use("/registration",registrationRoutes)

app.use("/centre",centreRouter)

app.use("/approve",approveRouter)

app.use("/leadBank",leadBankRouter)

app.use(erroHandler)

module.exports={app}







