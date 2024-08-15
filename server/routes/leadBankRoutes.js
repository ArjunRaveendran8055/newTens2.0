const { submitLeadController, getAllLeadsController,uploadLeadsController } = require("../controllers/leadBankController");

const express = require("express");
const leadBankRouter = express.Router();

leadBankRouter.post("/submitLead", submitLeadController);

leadBankRouter.get("/getAllLeads",getAllLeadsController)

leadBankRouter.post("/bulkUploadLead",uploadLeadsController)

module.exports = {
  leadBankRouter,
};
