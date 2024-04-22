const { createReportController, getReportController, getClassStudentDetailsController, addMentorResponseController } = require("../controllers/classReportControllers")

const classReportRoutes=require("express").Router()


classReportRoutes.post('/CreateReport/:id',createReportController)
classReportRoutes.get('/GetAllReport/:id',getReportController)
classReportRoutes.get("/GetClassStudentDetails/:id", getClassStudentDetailsController );
classReportRoutes.post("/addMentorResponse",addMentorResponseController)





module.exports={classReportRoutes}