const Flutterwave = require("flutterwave-node-v3");
const User = require("../model/User.model");
const PUBLIC_KEY = process.env.PAY_PUBLIC_KEY,
  SECRET_KEY = process.env.PAY_SECRET_KEY,
  ENC_KEY = process.env.PAY_ENCRYPTION_KEY;
const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);

const formatPayload = (user, payload, accountBank) => {
  let account_bank = "044";
  accountBank.data.forEach((bank) => {
    bank.name.includes(user.bank);
    account_bank = bank.code;
  });
  const formatedPayload = {
    account_bank,
    account_number: user.accountNumber,
    amount: payload.amount,
    narration: payload.narration,
    currency: payload.currency,
    reference: "TF-" + Date.now(),
    debit_currency: "NGN",
  };
  return formatedPayload;
};

const initiateTransfer = async (payload) => {
  try {
    const user = await User.findOne({ _id: payload.userId });
    if (!user) return { success: false, err: "User does no exist" };
    const accountBank = await flw.Bank.country({
      country: payload.currency.substring(0, 2),
    });
    const formatedPayload = await formatPayload(user, payload, accountBank);
    const response = await flw.Transfer.initiate(formatedPayload);
    return { success: true, ...response };
  } catch (err) {
    return { success: false, err: err.message };
  }
};

module.exports = {
  initiateTransfer,
};
