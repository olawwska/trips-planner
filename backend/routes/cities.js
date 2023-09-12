const router = require('express').Router();
// const { isUserAuthenticated } = require('../middlewares/auth');
const {
  // handleAddCity,
  // handleGetAllCities,
  // handleDeleteCity,
  // handleGetCityById,
} = require('../databaseHandlers');
const { City } = require('../db/models');

router.get('/cities', async (req, res, next) => {
  // const { googleId } = req.user;
  // console.log(googleId);
  const allCities = await City.findAll();
  res.json(allCities);
});

router.post('/cities', async (req, res, next) => {
  const { city } = req.body;
  const newCity = await City.create({ city });
  res.json(newCity);
});

router.get('/cities/:cityId', async (req, res, next) => {
  const { cityId } = req.params;
  const city = await City.findByPk(cityId);
  res.json(city);
});

router.delete('/cities/:cityId', async (req, res, next) => {
  const { cityId } = req.params;
  const city = await City.findByPk(cityId);
  const removedCity = await city.destroy();
  res.json({ message: 'City successfully removed', body: removedCity });
});

module.exports = router;
