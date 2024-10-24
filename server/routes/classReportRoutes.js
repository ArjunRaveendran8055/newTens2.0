const { createReportController, getReportController, getClassStudentDetailsController, addMentorResponseController, getReportForClassController, uploadAttendanceController } = require("../controllers/classReportControllers");
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity");

const classReportRoutes=require("express").Router()


classReportRoutes.post('/CreateReport/:id',authorizeGenuinity(),createReportController)
classReportRoutes.get('/GetAllReport/:id',authorizeGenuinity(),getReportForClassController)
classReportRoutes.get("/GetClassStudentDetails/:id",authorizeGenuinity(), getClassStudentDetailsController );
classReportRoutes.post("/addMentorResponse",authorizeGenuinity(),addMentorResponseController)
classReportRoutes.post("/uploadAttendance",authorizeGenuinity(),uploadAttendanceController)





module.exports={classReportRoutes}