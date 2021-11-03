exports.getAllUsers = {
  get: {
    tags: ["User"],
    description: "Get All Users",
    operationId: "getAllUsers",
    parameters: [],
    responses: {
      // 200: {
      //   description: "All Users were obtained",
      //   content: {
      //     "application/json": {
      //       schema: {
      //         $ref: "#/components/schemas/User",
      //       },
      //     },
      //   },
      // },
    },
  },
};

exports.signupUser = {
  post: {
    tags: ["User"],
    description: "Create a User",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateUser",
          },
        },
      },
    },
    operationId: "signupUser",
    parameters: [],
    responses: {},
  },
};

exports.loginUser = {
  post: {
    tags: ["User"],
    description: "Sign in a User",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/LoginUser",
          },
        },
      },
    },
    operationId: "loginUser",
    parameters: [],
    responses: {},
  },
};

exports.updateUser = {
  put: {
    tags: ["User"],
    description: "Update user account details",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdateUser",
          },
        },
      },
    },
    operationId: "updateUser",
    parameters: [],
    responses: {},
  },
};

exports.getUserData = {
  get: {
    tags: ["User"],
    description: "Get All Files",
    operationId: "getUserData",
    parameters: [],
    // security: [{ jwt: [] }],
    responses: {},
  },
};

exports.deleteUser = {
  delete: {
    tags: ["User"],
    description: "Pull user account details",
    operationId: "deleteUser",
    parameters: [],
    responses: {
      200: {
        description: "User account deatials fetched",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  },
};
