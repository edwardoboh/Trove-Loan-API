const Portfolio = require("../../model/Portfolio.model");

// GET:: /api/v1/portfolio/:id
const getPortfolio = (req, res) => {
  const userId = req.user._id;
  Portfolio.findOne({ userId }, (err, portfolio) => {
    if (err) return res.json({ err: err.message });
    if (!portfolio) return res.json({ err: "User has no portfolio" });
    res.json(portfolio);
  });
};

// GET:: /api/v1/portfolio/value/:id
const getportfolioValue = (req, res) => {
  const userId = req.user._id;
  Portfolio.findOne({ userId }, (err, portfolio) => {
    if (err) return res.json({ err: err.message });
    if (!portfolio) return res.json({ err: "User has no portfolio" });
    res.json(portfolio.portfolioValue);
  });
};

// POST:: /api/v1/portfolio/create
const createPortfolio = async (req, res) => {
  try {
    let port = req.body;
    port["userId"] = req.user._id;
    const portfolio = await Portfolio.create(port);
    res.json(portfolio);
  } catch (err) {
    res.json({ err: err.message });
  }
};

// PUT:: /api/v1/portfolio/update/:id
const updatePortfolio = (req, res) => {
  const userId = req.user._id;
  const newPortfolio = req.body;
  Portfolio.findOne({ userId }, (err, resp) => {
    if (err) return res.json({ err: err.message });
    if (!resp) return res.json({ err: "Portfolio doesn't exists" });
    resp.stockPositions.push(newPortfolio);
    resp.portfolioValue += newPortfolio.equityValue;
    resp.loanMax = resp.portfolioValue * resp.maxPercent;
    resp.save();
    res.json(resp);
  });
};

// DELETE:: /api/v1/portfolio/delete/:symbol
const deleteFromPortfolio = (req, res) => {
  const userId = req.user._id;
  const symbol = req.params.symbol;
  Portfolio.findOne({ userId }, async (err, resp) => {
    if (err) return res.json({ err: err.message });
    if (!resp) return res.json({ err: "User Portfolio not found" });
    const newPositions = await resp.stockPositions.filter((position) => {
      return position.symbol != symbol;
    });
    resp.stockPositions = newPositions;
    const newPortfolio = await resp.save();
    res.json(newPortfolio);
  });
};

// DELETE:: /api/v1/portfolio/delete/all/:id
const deleteWholePortfolio = (req, res) => {
  const userId = req.user._id;
  Portfolio.findOneAndDelete({ userId }, (err, resp) => {
    if (err) return res.json({ err: err.message });
    if (!resp) return res.json({ err: "User Portfolio not found" });
    res.json(resp);
  });
};

module.exports = {
  getPortfolio,
  getportfolioValue,
  createPortfolio,
  updatePortfolio,
  deleteFromPortfolio,
  deleteWholePortfolio,
};
