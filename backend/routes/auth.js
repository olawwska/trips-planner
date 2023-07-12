const router = require('express').Router();
const passport = require('passport');
const CLIENT_URL = 'http://localhost:3000/';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}cities`,
    failureRedirect: '/login/failed',
  }),
  (req, res) => {
    res.send('Thank you for signing in!');
  }
);
module.exports = router;
