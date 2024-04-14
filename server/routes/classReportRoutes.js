const { createReportController, getReportController, getClassStudentDetailsController } = require("../controllers/classReportControllers")

const classReportRoutes=require("express").Router()



classReportRoutes.post('/CreateReport/:id',createReportController)
classReportRoutes.get('/GetAllReport/:id',getReportController)
classReportRoutes.get("/GetClassStudentDetails/:id", getClassStudentDetailsController );





module.exports={classReportRoutes}