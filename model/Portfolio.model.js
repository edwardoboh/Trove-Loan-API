const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  userId: { type: String, required: true },
  stockPositions: [
    {
      symbol: { type: String, required: true },
      totalQuantity: { type: Number, required: true },
      equityValue: { type: Number, required: true },
      pricePerShare: { type: Number, required: true },
    },
  ],
  portfolioValue: { type: Number },
  maxPercent: { type: Number, default: 0.6 },
  loanMax: { type: Number },
});

PortfolioSchema.pre("save", async function (next) {
  let totalValue = 0;
  this.stockPositions.forEach((position) => {
    totalValue += position.equityValue;
  });
  this.portfolioValue = totalValue;
  this.loanMax = totalValue * this.maxPercent;
  next();
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
