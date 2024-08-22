const express=require("express")
const { addSchoolController } = require("../controllers/schoolcontroller")

const schoolRouter=express.Router()

schoolRouter.post("/addSchool",addSchoolController)


module.exports={
    schoolRouter
}