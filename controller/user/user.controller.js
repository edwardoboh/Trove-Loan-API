const User = require("../../model/User.model");
const jwt = require("jsonwebtoken");

// GET:: /api/v1/user/:id
const getuser = async (req, res) => {
  const user = await User.find({ _id: req.user._id });
  if (!user || user.length == 0) return res.json({ err: "No user Found" });
  res.json(user);
};

// GET:: /api/v1/user/all
const getallusers = async (req, res) => {
  const users = await User.find();
  if (!users || users.length == 0) return res.json({ err: "No user Found" });
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
    const _id = req.user._id;
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
const deleteUser = (req, res) => {
  const _id = req.user._id;
  User.findOneAndDelete({ _id }, (err, resp) => {
    if (err) return res.json({ err: err.message });
    if (!resp) return res.json({ err: "User no longer exists in Database" });
    res.json({ success: true, Deleted: resp });
  });
};

module.exports = {
  signup,
  getallusers,
  getuser,
  login,
  deleteUser,
  updateUser,
};
