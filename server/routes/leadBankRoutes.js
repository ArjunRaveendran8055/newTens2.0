const { submitLeadController, getAllLeadsController, exportLeadController } = require("../controllers/leadBankController");

const express = require("express");
const leadBankRouter = express.Router();

leadBankRouter.post("/submitLead", submitLeadController);

leadBankRouter.get("/getAllLeads",getAllLeadsController)

leadBankRouter.post("/exportleads",exportLeadController)

module.exports = {
  leadBankRouter,
};
