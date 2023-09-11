const express = require('express');
const app = express();

require('express-async-errors');
require('dotenv').config();

app.use(express.json());

const { City } = require('./db/models');

app.get('/cities', async (req, res, next) => {
  const allCities = await City.findAll();
  console.log(allCities);
  res.json(allCities);
});

app.post('/cities', async (req, res, next) => {
  const { city } = req.body;
  const newCity = await City.create({ city });
  res.json(newCity);
});

const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));
