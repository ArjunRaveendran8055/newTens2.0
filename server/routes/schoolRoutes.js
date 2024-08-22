const express=require("express")
const { addSchoolController } = require("../controllers/schoolController")

const schoolRouter=express.Router()

schoolRouter.post("/addSchool",addSchoolController)


module.exports={
    schoolRouter
}