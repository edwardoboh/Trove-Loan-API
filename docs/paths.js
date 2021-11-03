const {
  getUserData,
  getAllUsers,
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("./user/user.docs");
const {
  getUserPortfolio,
  getUserPortfolioValue,
  createUserPortfolio,
  updateUserPortfolio,
  deleteStockFromUserPortfolio,
  deleteUserPortfolio,
} = require("./portfolio/portfolio.docs");
const {
  getLoanBalance,
  takeLoan,
  initiatePayback,
  completePayback,
} = require("./loan/loan.docs");

module.exports = {
  paths: {
    // USER ROUTES::::::::::::::::::::::::::
    "/user/signup": {
      ...signupUser,
    },
    "/user/login": {
      ...loginUser,
    },
    "/user": {
      ...getUserData,
    },
    "/user/all": {
      ...getAllUsers,
    },
    "/user/update": {
      ...updateUser,
    },
    "/user/delete": {
      ...deleteUser,
    },
    // PORTFOLIO ROUTES::::::::::::::::::::::
    "/portfolio/create": {
      ...createUserPortfolio,
    },
    "/portfolio": {
      ...getUserPortfolio,
    },
    "/portfolio/value": {
      ...getUserPortfolioValue,
    },
    "/portfolio/update": {
      ...updateUserPortfolio,
    },
    "/portfolio/delete/{symbol}": {
      ...deleteStockFromUserPortfolio,
    },
    "/portfolio/deleteall": {
      ...deleteUserPortfolio,
    },
    // LOAN ROUTES:::::::::::::::::::::::::::
    "/loan/takeLoan": {
      ...takeLoan,
    },
    "/loan": {
      ...getLoanBalance,
    },
    "/loan/initiate/payback": {
      ...initiatePayback,
    },
    "/loan/complete/payback": {
      ...completePayback,
    },
  },
};
