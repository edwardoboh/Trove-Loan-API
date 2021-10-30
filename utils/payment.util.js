const Flutterwave = require("flutterwave-node-v3");
const User = require("../model/User.model");
const uuid = require("uuid");
const PUBLIC_KEY = process.env.PAY_PUBLIC_KEY,
  SECRET_KEY = process.env.PAY_SECRET_KEY,
  ENC_KEY = process.env.PAY_ENCRYPTION_KEY;

const formatPayload = async (userPayload) => {
  const { card_number, cvv, expiry_month, expiry_year, currency, amount, pin } =
    userPayload;
  const { name: fullname, email, phone: phone_number } = userPayload.user;
  let payload = {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    currency,
    amount,
    fullname,
    email,
    phone_number,
    authorization: {
      mode: "pin",
      fields: ["pin"],
      pin,
    },
    enckey: ENC_KEY,
    tx_ref: `MC-${uuid.v4()}`,
  };
  return payload;
};

const initiatePayment = async (userPayload) => {
  try {
    const user = await User.findOne({ _id: userPayload.userId });
    if (!user) return { success: false, err: "No user Found" };
    const { name, email, phone } = user;
    userPayload["user"] = { name, email, phone };
    try {
      const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);
      const payload = await formatPayload(userPayload);
      const callCharge = await flw.Charge.card(payload);
      // console.log("Call Charge", callCharge);
      const newPayment = {
        userId: userPayload.userId,
        flw,
        tx_ref: callCharge.data.tx_ref,
        flw_ref: callCharge.data.flw_ref,
        amount: callCharge.data.amount,
        success: true,
      };
      return newPayment;
    } catch (error) {
      return { success: false, err: error.message };
    }
  } catch (err) {
    return { success: false, err: "Invalid User data" };
  }
};

const completePayment = async (newPayment, otp) => {
  const { flw, flw_ref } = newPayment;
  try {
    const callValidate = await flw.Charge.validate({
      otp,
      flw_ref,
    });
    // console.log("Call Validate", callValidate);
    return callValidate;
  } catch (err) {
    return { success: false, err: error.message };
  }
};
module.exports = {
  initiatePayment,
  completePayment,
};
