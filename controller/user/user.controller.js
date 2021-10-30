const User = require("../../model/User.model");
const jwt = require("jsonwebtoken");

// GET:: /api/v1/user
const getuser = async (req, res) => {
  console.log("USer1 ", req.user);
  console.log("USer2 ", req.token);
  const users = await User.find();
  if (!users) return res.json({ err: "No user Found" });
  res.json({ users });
};

// POST:: /api/v1/user/signup
const signup = (req, res) => {
  res.json(req.user);
};

// POST:: /api/v1/user/login
const login = (req, res) => {
  const user = req.user._doc;
  delete user.password;
  const { _id, email } = user;
  const token = jwt.sign({ _id, email }, process.env.TOKEN_SECRET, {
    expiresIn: "40m",
  });
  res.json({
    user,
    accessToken: `Bearer ${token}`,
    expiresIn: "40m",
  });
};

// PUT:: /api/v1/user/update/:id
const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateBody = req.body;
    if (updateBody.password) {
      updateBody.password = await require("bcrypt").hash(
        updateBody.password,
        10
      );
    }
    const updatedUser = await User.findOneAndUpdate({ _id }, updateBody, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.json({ err: err.message });
  }
};

//

// DELETE:: /api/v1/user/delete/:id
const deleteUser = (req, res) => {};

module.exports = {
  signup,
  getuser,
  login,
  deleteUser,
  updateUser,
};
