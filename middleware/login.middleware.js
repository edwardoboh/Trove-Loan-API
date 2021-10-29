const User = require("../model/User.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, {
            message: `No user with email ${email}`,
          });
        const isValid = await user.isValidPassword(user, password);
        if (!isValid)
          return done(null, false, { message: "Invalid Credentials" });
        done(null, user);
      } catch (err) {
        done(err.message);
      }
    }
  )
);

module.exports = passport;
