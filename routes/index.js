const express = require("express");
const router = express.Router();
const portfolioRoute = require("./portfolio/portfolio.route");
const userRoute = require("./user/user.route");
const loanRoute = require("./loan/loan.route");
const auth = require("../middleware/auth.middleware");

router.use("/user", userRoute);
router.use("/loan", auth.authenticate("jwt", { session: false }), loanRoute);
router.use(
  "/portfolio",
  auth.authenticate("jwt", { session: false }),
  portfolioRoute
);

module.exports = router;
