const express = require('express');

require('express-async-errors');
require('dotenv').config();

const cors = require('cors');
const cookieSession = require('cookie-session');
const passportSetup = require('./passport');
const passport = require('passport');
const authRoute = require('./routes/auth');
const citiesRoute = require('./routes/cities');
const attractionsRoute = require('./routes/attractions');

const app = express();
app.use(express.json());

app.use(cookieSession({ name: 'session', keys: ['openreplay'], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());

app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoute);
app.use('', citiesRoute);
app.use('/', attractionsRoute);

const port = 8000;
app.listen(port, () => console.log('Server is listening on port', port));

// process.on('SIGINT', function () {
//   console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
//   process.exit(0);
// });
