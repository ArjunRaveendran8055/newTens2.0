const { createReportController, getReportController } = require("../controllers/classReportControllers")

const classReportRoutes=require("express").Router()



classReportRoutes.post('/CreateReport/:id',createReportController)
classReportRoutes.get('/GetAllReport/:id',getReportController)




module.exports={classReportRoutes}