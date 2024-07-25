const { getAllCentresController, createCentreController, deleteCentreController,createClassController,getAllClassController,deleteClassController,addBatchController,getBatchController,addAAcontroller} = require("../controllers/centreController")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",authorizeGenuinity,getAllCentresController)
 centreRouter.post("/createCentre",authorizeGenuinity, createCentreController)
 centreRouter.delete("/deleteCentre/:id",authorizeGenuinity,deleteCentreController)
 centreRouter.put("/addClass/:id",authorizeGenuinity,createClassController)

 centreRouter.get("/getAllClass/:id",authorizeGenuinity,getAllClassController)
 centreRouter.delete("/deleteCentreClass/:id",authorizeGenuinity,deleteClassController)

 centreRouter.post("/addBatch", addBatchController)
 centreRouter.post("/getBatch", getBatchController)
 centreRouter.post('/addAAtoClass', addAAcontroller)


 module.exports={
    centreRouter
 }