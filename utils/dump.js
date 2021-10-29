/**
 * 
 * let payload = {
    card_number: "5531886652142950",
    cvv: "564",
    expiry_month: "09",
    expiry_year: "23",
    currency: "NGN",
    amount: "100",
    fullname: "Olufemi Obafunmiso",
    email: "olufemi@flw.com",
    phone_number: "0902620185",
    authorization: {
      mode: "pin",
      fields: ["pin"],
      pin: 3310,
    },
    enckey: ENC_KEY,
    tx_ref: `MC-${uuid.v4()}`, // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
  };
 */

// const open = require("open");
// const makePayment = () => {
//   const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);
//   const payload = {
//     card_number: "5531886652142950",
//     cvv: "564",
//     expiry_month: "09",
//     expiry_year: "23",
//     currency: "NGN",
//     amount: "100",
//     redirect_url: "https://www.google.com",
//     fullname: "Olufemi Obafunmiso",
//     email: "olufemi@flw.com",
//     phone_number: "0902620185",
//     enckey: ENC_KEY,
//     tx_ref: "MC-32444ee--4eerye4euee3rerds4423e43e", // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.
//   };

//   const chargeCard = async () => {
//     try {
//       const response = await flw.Charge.card(payload);
//       console.log("CHARGE RESPONSE", response);
//       if (response.meta.authorization.mode === "pin") {
//         let payload2 = payload;
//         payload2.authorization = {
//           mode: "pin",
//           fields: ["pin"],
//           pin: 3310,
//         };
//         const reCallCharge = await flw.Charge.card(payload2);
//         const callValidate = await flw.Charge.validate({
//           otp: "12345",
//           flw_ref: reCallCharge.data.flw_ref,
//         });
//         console.log(callValidate);
//       }
//       if (response.meta.authorization.mode === "redirect") {
//         const url = response.meta.authorization.redirect;
//         // open(url);
//         console.log("REDIRECT URL", url);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   chargeCard();
// };

// {
//     "name": "Edward O Oboh",
//     "email": "obohedward@gmail.com",
//     "password": "12345",
//     "NIN": "123456789",
//     "phone": "123456789",
//     "address": "address",
//     "sex": "male",
//     "age": 24,
//     "bank": "GT",
//     "accountNumber": 632734365,
//     "nationality": "Nigeria"
//   }
