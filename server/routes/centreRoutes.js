const { getAllCentresController } = require("../controllers/centreController")

const centreRouter=require("express").Router()

 centreRouter.get("/getAllCentres",getAllCentresController)


 module.exports={
    centreRouter
 }