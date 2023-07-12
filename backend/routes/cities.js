const router = require('express').Router();
const { isUserAuthenticated } = require('../middlewares/auth');
const {
  handleAddCity,
  handleGetAllCities,
  handleDeleteCity,
  handleGetCityById,
} = require('../databaseHandlers');

router.post('/addCity', async (req, res) => {
  const result = await handleAddCity(req);
  res.send({ result });
});

router.get('/getAllCities', isUserAuthenticated, async (req, res) => {
  const result = await handleGetAllCities(req);
  res.send(result);
});

router.delete('/deleteCity/:cityId', async (req, res) => {
  const result = await handleDeleteCity(req);
  res.send(result);
});

router.get('/getCityById/:cityId', async (req, res) => {
  const { cityId } = req.params;
  const result = await handleGetCityById(cityId);
  res.send(result);
});

module.exports = router;
