const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { db_run } = require('./helpers');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, cb) => {
      const user = {
        googleId: profile.id,
        userEmail: profile.emails[0].value,
        userName: profile.name.givenName,
      };

      return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user);
});

passport.deserializeUser((user, cb) => {
  return cb(null, user);
});
