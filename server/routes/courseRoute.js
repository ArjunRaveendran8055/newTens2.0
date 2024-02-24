const { getAllCourseController } = require("../controllers/courseController")

const courseRoute=require("express").Router()

courseRoute.get("/getAllCourses",getAllCourseController)


module.exports={courseRoute}