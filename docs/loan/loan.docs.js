exports.getLoanBalance = {
  get: {
    tags: ["Loan"],
    description: "Get a statement of the user's loan",
    operationId: "getLoanBalance",
    parameters: [],
    responses: {
      // 200: {
      //   description: "Successfully returned Information about Plug-In",
      //   content: {
      //     "application/json": {
      //       schema: {
      //         $ref: "#/components/schemas/Loan",
      //       },
      //     },
      //   },
      // },
    },
  },
};

exports.takeLoan = {
  post: {
    tags: ["Loan"],
    description: "Endpoint for user to request a loan",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/RequestLoan",
          },
        },
      },
    },
    operationId: "takeLoan",
    parameters: [],
    responses: {},
  },
};

exports.initiatePayback = {
  post: {
    tags: ["Loan"],
    description: "Endpoint for user to initiate the pay back of loan",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InitiatePayback",
          },
        },
      },
    },
    operationId: "initiatePayback",
    parameters: [],
    responses: {},
  },
};

exports.completePayback = {
  post: {
    tags: ["Loan"],
    description:
      "Endpoint for a user to complete the pay back of loan - ENSURE TO ENTER 'tx_ref' GOTTEN WHEN PAYMENT WAS INITIATED",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CompletePayback",
          },
        },
      },
    },
    operationId: "completePayback",
    parameters: [],
    responses: {},
  },
};
