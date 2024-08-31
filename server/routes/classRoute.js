const { createClassController, updateClassController, deleteClassController, getAllClassesController, getClassByIdController } = require("../controllers/classControllers")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")

const classRoutes=require("express").Router()



classRoutes.post('/createClass',authorizeGenuinity(),createClassController)
classRoutes.put('/updateClass/:id',authorizeGenuinity(),updateClassController)
classRoutes.delete('/deleteClass/:id',authorizeGenuinity(),deleteClassController)
classRoutes.get('/getAllClass',authorizeGenuinity(),getAllClassesController)
classRoutes.get('/getOneClass/:id',authorizeGenuinity(),getClassByIdController)

module.exports={classRoutes}