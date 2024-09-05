const express=require("express")
const { addSchoolController, getLocationController } = require("../controllers/schoolcontroller")

const schoolRouter=express.Router()

schoolRouter.post("/addSchool",addSchoolController)
schoolRouter.get("/locations",getLocationController)


module.exports={
    schoolRouter
}