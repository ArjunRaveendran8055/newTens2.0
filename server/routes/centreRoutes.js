const { getAllCentresController, createCentreController, deleteCentreController} = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)
 centreRouter.post("/createCentre", createCentreController)
 centreRouter.delete("/deleteCentre/:id",deleteCentreController)


 module.exports={
    centreRouter
 }