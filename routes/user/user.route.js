const express = require("express");
const router = express.Router();
const signup = require("../../middleware/signup.middleware");
const login = require("../../middleware/login.middleware");
const auth = require("../../middleware/auth.middleware");
const userController = require("../../controller/user/user.controller");

// GET:: /api/v1/user/:id
router.get(
  "/",
  auth.authenticate("jwt", { session: false }),
  userController.getuser
);

// GET:: /api/v1/user/all
router.get(
  "/all",
  auth.authenticate("jwt", { session: false }),
  userController.getallusers
);

// POST:: /api/v1/user/signup
router.post(
  "/signup",
  signup.authenticate("signup", { session: false }),
  userController.signup
);

// POST:: /api/v1/user/login
router.post(
  "/login",
  login.authenticate("login", { session: false }),
  userController.login
);

// PUT:: /api/v1/user/update/:id
router.put(
  "/update",
  auth.authenticate("jwt", { session: false }),
  userController.updateUser
);

// DELETE:: /api/v1/user/delete/:id
router.delete(
  "/delete",
  auth.authenticate("jwt", { session: false }),
  userController.deleteUser
);

module.exports = router;
