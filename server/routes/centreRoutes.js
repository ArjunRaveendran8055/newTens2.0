const { getAllCentresController, createCentreController } = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)
 centreRouter.post("/createCentre", createCentreController)


 module.exports={
    centreRouter
 }