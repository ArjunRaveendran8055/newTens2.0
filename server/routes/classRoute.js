const { createClassController, updateClassController, deleteClassController, getAllClassesController, getClassByIdController } = require("../controllers/classControllers")

const classRoutes=require("express").Router()



classRoutes.post('/createClass',createClassController)
classRoutes.put('/updateClass/:id',updateClassController)
classRoutes.delete('/deleteClass/:id',deleteClassController)
classRoutes.get('/getAllClass',getAllClassesController)
classRoutes.get('/getOneClass/:id',getClassByIdController)







module.exports={classRoutes}