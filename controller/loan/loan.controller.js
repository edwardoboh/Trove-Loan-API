const Loan = require("../../model/Loan.model");
const Portfolio = require("../../model/Portfolio.model");
const payment = require("../../utils/payment.util");
const transfer = require("../../utils/transfer.util");
const config = require("../../utils/config");
let ongoingPayments = [];

// POST:: /api/v1/loan/takeloan
const takeLoan = async (req, res) => {
  let loan = req.body;
  loan["userId"] = req.user._id;
  if (loan.period > config.maxPeriod || loan.period < config.minPeriod)
    return res.json({ err: "Loan Period must be within 6 - 12 months" });
  let userPort, userLoan, newLoan, transferResponse;
  try {
    userPort = await Portfolio.findOne({ userId: loan.userId });
    userLoan = await Loan.findOne({ userId: loan.userId });
    if (!userPort)
      return res.status(404).json({ err: "No Portfolio exists for this user" });
    if (Number(loan.loanAmount) > Number(userPort.loanMax))
      return res.status(406).json({
        err: "Requested Loan cannot Exceeds Allowed maximum",
      });
    if (!userLoan) {
      loan["unpaidBalance"] = loan.loanAmount;
      transferResponse = await transfer.initiateTransfer(loan);
      if (transferResponse.success) newLoan = await Loan.create(loan);
    } else {
      if (
        Number(loan.loanAmount) + Number(userLoan.unpaidBalance) >
        Number(userPort.loanMax)
      )
        return res.status(406).json({
          err: "Total Loan Requested by user Exceeds Allowed maximum",
        });
      userLoan.unpaidBalance += loan.loanAmount;
      userLoan.loanAmount += loan.loanAmount;
      userLoan.loanPeriod = loan.loanPeriod;
      transferResponse = await transfer.initiateTransfer(loan);
      if (transferResponse.success) newLoan = await userLoan.save();
    }
    res.json({ transferResponse, newLoan });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// POST:: /api/v1/loan/initiate/payback
const initiatePayback = async (req, res) => {
  let payload = req.body;
  payload["userId"] = req.user._id;
  const initiatedObject = await payment.initiatePayment(payload);
  if (initiatedObject.success) {
    ongoingPayments.push(initiatedObject);
  }
  const { flw, ...currentPayment } = initiatedObject;
  res.json(currentPayment);
};

// POST:: /api/v1/loan/validate/payback
const completePayback = async (req, res) => {
  const { otp, tx_ref } = req.body;
  let paymentObject = await ongoingPayments.filter((payment, paymentIndex) => {
    return payment.tx_ref == tx_ref;
    // pop the object from the array
  })[0];
  if (!paymentObject)
    return res
      .status(501)
      .json({ err: "Connection Lost, Try initiating Payment again" });
  const completionResponse = await payment.completePayment(paymentObject, otp);
  Loan.findOne({ userId: paymentObject.userId }, async (err, resp) => {
    if (err) return (completionResponse["err"] = err.message);
    if (!resp)
      return (completionResponse["err"] = "This user hasn't taken any Loans");
    resp.unpaidBalance -= Number(paymentObject.amount);
    await resp.save();
  });
  res.json(completionResponse);
};

// GET:: /api/v1/loan/:id
const checkBalance = (req, res) => {
  const userId = req.user._id;
  Loan.findOne({ userId }, (err, resp) => {
    if (err) return res.status(500).json({ err: err.message });
    if (!resp) return res.status(404).json({ err: "User has no active loan" });
    res.json({
      loanAmount: resp.loanAmount,
      unpaidBalance: resp.unpaidBalance,
    });
  });
};

module.exports = {
  initiatePayback,
  completePayback,
  checkBalance,
  takeLoan,
};
