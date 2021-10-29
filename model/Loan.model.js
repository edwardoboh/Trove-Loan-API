const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
  userId: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  unpaidBalance: { type: Number, default: 0 },
  dateTaken: { type: Date, default: Date.now() },
  payupDate: { type: Date, default: null },
});

module.exports = mongoose.model("Loan", LoanSchema);
