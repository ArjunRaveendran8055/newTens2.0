const { createReportController } = require("../controllers/classReportControllers")

const classReportRoutes=require("express").Router()



classReportRoutes.post('/CreateReport/:id',createReportController)




module.exports={classReportRoutes}