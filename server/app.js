const express=require("express");
const cors=require("cors")

const { errorHandler } = require("./middleware/errorHandler");
const { bookRoute } = require("./routes/bookRoute");
const { courseRoute } = require("./routes/courseRoute");
const morgan = require("morgan");
const { authRoute } = require("./routes/authRoute");
const { signUpRoute } = require("./routes/signUpRoute");

const app=express();

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.static("public"))

//new user signUp route
app.use("/signUp",signUpRoute)

//auth/login Routes
app.use("/authenticate",authRoute)

//Book Routes
app.use("/books",bookRoute)

//CourseRoutes
app.use("/courses",courseRoute)

//using morgan middleware

app.use(morgan("dev"))



app.use(errorHandler)


module.exports={app}


