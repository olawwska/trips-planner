const router = require('express').Router();
const passport = require('passport');
const { isUserAuthenticated } = require('../middlewares/auth');
const CLIENT_URL = 'http://localhost:3000/';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}login/success`,
    failureRedirect: '/login/error',
  }),
  (req, res) => {
    res.send('Thank you for signing in!');
  }
);

router.get('/user', isUserAuthenticated, (req, res) => {
  res.json(req.user.userName);
});
module.exports = router;
