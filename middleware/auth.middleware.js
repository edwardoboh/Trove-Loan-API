const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: `${process.env.TOKEN_SECRET}`,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (err) {
        done(err.message);
      }
    }
  )
);

module.exports = passport;
