const express = require("express");
const router = express.Router();
const loanController = require("../../controller/loan/loan.controller");

// POST:: /api/v1/loan/takeloan
router.post("/takeloan", loanController.takeLoan);

// POST:: /api/v1/loan/initiate/payback
router.post("/initiate/payback", loanController.initiatePayback);

// POST:: /api/v1/loan/complete/payback
router.post("/complete/payback", loanController.completePayback);

// GET:: /api/v1/loan/:id
router.get("/", loanController.checkBalance);
module.exports = router;
