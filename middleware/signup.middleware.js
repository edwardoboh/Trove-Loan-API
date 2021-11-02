const User = require("../model/User.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.create({ ...req.body });
        return done(null, user);
      } catch (err) {
        done(null, {err: err.message})
      }
    }
  )
);

module.exports = passport;
