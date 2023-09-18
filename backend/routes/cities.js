const router = require('express').Router();
const { isUserAuthenticated } = require('../middlewares/auth');
const { City, Permission } = require('../db/models');

router.get('', isUserAuthenticated, async (req, res, next) => {
  const { googleId } = req.user;
  const permissions = await Permission.findAll(
    { attributes: ['cityId'] },
    { where: { googleId: googleId } }
  );

  const allCities = await Promise.all(permissions.map(async (p) => await City.findByPk(p.cityId)));
  res.json(allCities);
});

router.post('', async (req, res, next) => {
  const { city } = req.body;
  const { googleId } = req.user;
  const newCity = await City.create({ city });
  await Permission.create({ cityId: newCity.id, googleId });
  res.json(newCity);
});

router.get('/:cityId', async (req, res, next) => {
  const { cityId } = req.params;
  const city = await City.findByPk(cityId);
  res.json(city);
});

router.delete('/:cityId', async (req, res, next) => {
  const { cityId } = req.params;
  const city = await City.findByPk(cityId);
  const removedCity = await city.destroy();
  res.json({ message: 'City successfully removed', body: removedCity });
});

module.exports = router;
