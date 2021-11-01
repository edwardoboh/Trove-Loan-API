const express = require("express");
const router = express.Router();
const portfolioController = require("../../controller/portfolio/portfolio.controller");

// GET:: /api/v1/portfolio
router.get("/", portfolioController.getPortfolio);

// GET:: /api/v1/portfolio/value/:id
router.get("/value", portfolioController.getportfolioValue);

// POST:: /api/v1/portfolio/create
router.post("/create", portfolioController.createPortfolio);

// PUT:: /api/v1/portfolio/update/:id
router.put("/update", portfolioController.updatePortfolio);

// DELETE:: /api/v1/portfolio/delete/:symbol
router.delete("/delete/:symbol", portfolioController.deleteFromPortfolio);

// DELETE:: /api/v1/portfolio/delete/all/:id
router.delete("/deleteall", portfolioController.deleteWholePortfolio);

module.exports = router;
