const Portfolio = require("../../model/Portfolio.model");

// GET:: /api/v1/portfolio/:id
const getPortfolio = (req, res) => {
  Portfolio.findOne({ userId: req.params.id }, (err, portfolio) => {
    if (err) return res.json({ err: err.message });
    if (!portfolio) return res.json({ err: "User has no portfolio" });
    res.json(portfolio);
  });
};

// GET:: /api/v1/portfolio/value/:id
const getportfolioValue = (req, res) => {
  Portfolio.findOne({ userId: req.params.id }, (err, portfolio) => {
    if (err) return res.json({ err: err.message });
    if (!portfolio) return res.json({ err: "User has no portfolio" });
    res.json(portfolio.portfolioValue);
  });
};

// POST:: /api/v1/portfolio/create
const createPortfolio = async (req, res) => {
  try {
    let port = req.body;
    const portfolio = await Portfolio.create(port);
    res.json(portfolio);
  } catch (err) {
    res.json({ err: err.message });
  }
};

// PUT:: /api/v1/portfolio/update/:id
const updatePortfolio = (req, res) => {
  const userId = req.params.id;
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

// DELETE:: /api/v1/portfolio/delete/:id
const deleteSingle = (req, res) => {};

// DELETE:: /api/v1/portfolio/delete
const deleteAll = (req, res) => {};

module.exports = {
  getPortfolio,
  getportfolioValue,
  createPortfolio,
  updatePortfolio,
  deleteSingle,
  deleteAll,
};
