const { createReportController, getReportController, getClassStudentDetailsController, addMentorResponseController, getReportForClassController } = require("../controllers/classReportControllers");
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity");

const classReportRoutes=require("express").Router()


classReportRoutes.post('/CreateReport/:id',authorizeGenuinity(),createReportController)
classReportRoutes.get('/GetAllReport/:id',authorizeGenuinity(),getReportForClassController)
classReportRoutes.get("/GetClassStudentDetails/:id",authorizeGenuinity(), getClassStudentDetailsController );
classReportRoutes.post("/addMentorResponse",authorizeGenuinity(),addMentorResponseController)





module.exports={classReportRoutes}