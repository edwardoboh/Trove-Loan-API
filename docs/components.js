module.exports = {
  security: [
    {
      jwt: [],
    },
  ],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      //   *********************USER*****************************
      CreateUser: {
        type: "object",
        required: [
          "name",
          "email",
          "password",
          "NIN",
          "phone",
          "address",
          "sex",
          "age",
          "bank",
          "accountNumber",
          "nationality",
        ],
        example: {
          name: "Edward Oboh",
          email: "osaretinedward@gmail.com",
          password: "12345",
          NIN: "0123465789",
          phone: "123456789",
          address: "address",
          sex: "male",
          age: 24,
          bank: "GTB",
          accountNumber: "0632734365",
          nationality: "Nigerian",
        },
        properties: {
          //
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
          NIN: { type: "string" },
          phone: { type: "string" },
          address: { type: "string" },
          sex: { type: "string" },
          age: { type: "integer" },
          bank: { type: "string" },
          accountNumber: { type: "string" },
          nationality: { type: "string" },
          dateCreated: { type: "string" },
        },
      },
      LoginUser: {
        type: "object",
        required: ["email", "password"],
        example: {
          email: "osaretinedward@gmail.com",
          password: "12345",
        },
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      UpdateUser: {
        type: "object",
        required: [],
        example: {
          name: "Paul O Peter",
          phone: "9876543210",
          address: "user's new address",
        },
        properties: {
          name: { type: "string" },
          phone: { type: "string" },
          address: { type: "string" },
        },
      },
      //   *********************PORTFOLIO*****************************
      CreatePortfolio: {
        type: "object",
        required: ["stockPositions"],
        example: {
          stockPositions: [
            {
              symbol: "AAPL",
              totalQuantity: 20,
              equityValue: 2500.0,
              pricePerShare: 125.0,
            },
            {
              symbol: "TSLA",
              totalQuantity: 5.0,
              equityValue: 3000.0,
              pricePerShare: 600.0,
            },
          ],
        },
        properties: {
          stockPositions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                symbol: { type: "string" },
                totalQuantity: { type: "number" },
                equityValue: { type: "number" },
                pricePerShare: { type: "number" },
              },
            },
          },
          portfolioValue: { type: "number" },
          maxPercent: { type: "number" },
          loanMax: { type: "number" },
        },
      },
      UpdatePortfolio: {
        type: "object",
        required: ["symbol", "totalQuantity", "equityValue", "pricePerShare"],
        example: {
          symbol: "AMZN",
          totalQuantity: 1.38461538,
          equityValue: 4500.0,
          pricePerShare: 150.0,
        },
        properties: {
          symbol: { type: "string" },
          totalQuantity: { type: "number" },
          equityValue: { type: "number" },
          pricePerShare: { type: "number" },
        },
      },
      symbol: {
        type: "string",
        description: "Symbol of a stock",
        example: "TSLA",
      },
      //   *********************LOAN*****************************
      RequestLoan: {
        type: "object",
        required: ["loanAmount", "loanPeriod", "narration", "currency"],
        example: {
          loanAmount: 1000,
          loanPeriod: 4,
          narration: "Asking for a loan",
          currency: "NGN",
        },
        properties: {
          loanAmount: { type: "number" },
          loanPeriod: { type: "number" },
          narration: { type: "string" },
          currency: { type: "string" },
        },
      },
      InitiatePayback: {
        type: "object",
        required: [
          "card_number",
          "cvv",
          "expiry_month",
          "expiry_year",
          "currency",
          "amount",
          "pin",
        ],
        example: {
          card_number: "5531886652142950",
          cvv: "564",
          expiry_month: "09",
          expiry_year: "23",
          currency: "NGN",
          amount: "3500",
          pin: 3310,
        },
        properties: {
          card_number: { type: "string" },
          cvv: { type: "string" },
          expiry_month: { type: "string" },
          expiry_year: { type: "string" },
          currency: { type: "string" },
          amount: { type: "string" },
          pin: { type: "number" },
        },
      },
      CompletePayback: {
        type: "object",
        required: ["otp", "tx_ref"],
        example: {
          otp: 12345,
          tx_ref: "MC-1ae4970f-3c87-451f-b5ce-84bb54be8fd6",
        },
        properties: {
          otp: { type: "number" },
          tx_ref: { type: "string" },
        },
      },
    },
  },
};
