const { submitLeadController } = require("../controllers/leadBankController");

const express = require("express");
const leadBankRouter = express.Router();

leadBankRouter.post("/submitLead", submitLeadController);

module.exports = {
  leadBankRouter,
};
