const { getAllCentresController, createCentreController, deleteCentreController,createClassController,getAllClassController} = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)
 centreRouter.post("/createCentre", createCentreController)
 centreRouter.delete("/deleteCentre/:id",deleteCentreController)
 centreRouter.put("/addClass/:id",createClassController)

 centreRouter.get("/getAllClass/:id",getAllClassController)


 module.exports={
    centreRouter
 }