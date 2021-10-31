const express = require("express");
const router = express.Router();
const portfolioController = require("../../controller/portfolio/portfolio.controller");

// GET:: /api/v1/portfolio
router.get("/:id", portfolioController.getPortfolio);

// GET:: /api/v1/portfolio/value/:id
router.get("/value/:id", portfolioController.getportfolioValue);

// POST:: /api/v1/portfolio/create
router.post("/create", portfolioController.createPortfolio);

// PUT:: /api/v1/portfolio/update/:id
router.put("/update/:id", portfolioController.updatePortfolio);

// DELETE:: /api/v1/portfolio/delete/:id
router.delete("/delete/:id", portfolioController.deleteFromPortfolio);

// DELETE:: /api/v1/portfolio/delete/all/:id
router.delete("/delete/all/:id", portfolioController.deleteWholePortfolio);

module.exports = router;
