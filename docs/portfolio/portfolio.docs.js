exports.createUserPortfolio = {
  post: {
    tags: ["Portfolio"],
    description: "Create User Portfolio",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreatePortfolio",
          },
        },
      },
    },
    operationId: "createUserPortfolio",
    parameters: [],
    responses: {
      // 201: {
      //   description: "Created a Portfolio for the Signed in user",
      //   content: {
      //     "application/json": {
      //       schema: {
      //         $ref: "#/components/schemas/Portfolio",
      //       },
      //     },
      //   },
      // },
    },
  },
};

exports.getUserPortfolio = {
  get: {
    tags: ["Portfolio"],
    description: "Get a user's Portfolio",
    operationId: "getUserPortfolio",
    parameters: [],
    responses: {},
  },
};

exports.getUserPortfolioValue = {
  get: {
    tags: ["Portfolio"],
    description: "Obtain the total Value of User Portfolio",
    operationId: "getUserPortfolioValue",
    parameters: [],
    responses: {},
  },
};

exports.updateUserPortfolio = {
  put: {
    tags: ["Portfolio"],
    description: "Add a new Stock to the user Portfolio ",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdatePortfolio",
          },
        },
      },
    },
    operationId: "updateUserPortfolio",
    parameters: [],
    responses: {},
  },
};

exports.deleteStockFromUserPortfolio = {
  delete: {
    tags: ["Portfolio"],
    description: "Remove a particular stock from the user portfolio",
    operationId: "deleteStockFromUserPortfolio",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/symbol",
        },
        required: true,
        description: "Stock symbol of the stock to remove from Portfolio",
      },
    ],
    responses: {},
  },
};

exports.deleteUserPortfolio = {
  delete: {
    tags: ["Portfolio"],
    description: "Delete the user portfolio entirely",
    operationId: "deleteUserPortfolio",
    parameters: [],
    responses: {},
  },
};
