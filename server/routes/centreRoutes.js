const { getAllCentresController, createCentreController, deleteCentreController,createClassController,getAllClassController,deleteClassController,addBatchController,getBatchController,addAAcontroller,getAAcontroller,getCentreTagsController,updateMentorController} = require("../controllers/centreController")
const { authorizeGenuinity } = require("../middleware/authorizeGenuinity")


const centreRouter = require("express").Router();

centreRouter.get("/getAllCentres", authorizeGenuinity(), getAllCentresController);
centreRouter.post("/createCentre", authorizeGenuinity(), createCentreController);
centreRouter.delete(
  "/deleteCentre/:id",
  authorizeGenuinity(),
  deleteCentreController
);
centreRouter.get("/getCentreTags",authorizeGenuinity(), getCentreTagsController);

centreRouter.put("/addClass/:id", authorizeGenuinity(), createClassController);
centreRouter.get("/getAllClass/:id", authorizeGenuinity(), getAllClassController);
centreRouter.delete(
  "/deleteCentreClass/:id",
  authorizeGenuinity(),
  deleteClassController
);


centreRouter.post('/addAAtoClass',authorizeGenuinity(), addAAcontroller)
centreRouter.post('/getAAtoClass',authorizeGenuinity(), getAAcontroller)
centreRouter.post("/addBatch", authorizeGenuinity(), addBatchController);
centreRouter.post("/getBatch", authorizeGenuinity(), getBatchController);
centreRouter.post("/updateMentor", authorizeGenuinity(), updateMentorController);

module.exports = {
  centreRouter,
};
