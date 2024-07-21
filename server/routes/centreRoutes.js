const { getAllCentresController, createCentreController, deleteCentreController,createClassController,getAllClassController,deleteClassController} = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)
 centreRouter.post("/createCentre", createCentreController)
 centreRouter.delete("/deleteCentre/:id",deleteCentreController)
 centreRouter.put("/addClass/:id",createClassController)

 centreRouter.get("/getAllClass/:id",getAllClassController)
 centreRouter.delete("/deleteCentreClass/:id",deleteClassController)


 module.exports={
    centreRouter
 }