const express = require("express");
const router = express.Router();
const portfolioRoute = require("./portfolio/portfolio.route");
const userRoute = require("./user/user.route");
const loanRoute = require("./loan/loan.route");

router.use("/user", userRoute);
router.use("/loan", loanRoute);
router.use("/portfolio", portfolioRoute);

module.exports = router;
