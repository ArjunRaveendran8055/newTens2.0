const { getAllCentresController, createCentreController, deleteCentreController,createClassController} = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)
 centreRouter.post("/createCentre", createCentreController)
 centreRouter.delete("/deleteCentre/:id",deleteCentreController)
 centreRouter.put("/addClass/:id",createClassController)


 module.exports={
    centreRouter
 }