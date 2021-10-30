const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  NIN: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  bank: { type: String },
  accountNumber: { type: String, required: true },
  nationality: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  this.password = hashedPassword;
  next();
});

UserSchema.methods.isValidPassword = async (user, password) => {
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("USer", UserSchema);
