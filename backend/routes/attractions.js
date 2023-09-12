const router = require('express').Router();
const {
  // handleAddAttraction,
  // handleGetAttractionsForCity,
  // handleGetRatingForAttraction,
  // handleEditAttraction,
  // handleAddRating,
  // handleDeleteAttraction,
} = require('../databaseHandlers');
// const { isUserAuthenticated } = require('../middlewares/auth');
const { City, Attraction } = require('../db/models');

router.get('/:cityId/attractions', async (req, res, next) => {
  const { cityId } = req.params;
  const city = await City.findByPk(cityId);
  const attractions = await city.getAttractions();
  res.json(attractions);
});

router.post('/attractions', async (req, res, next) => {
  const { cityId } = req.body;
  const attractionPayload = req.body;
  const city = await City.findByPk(cityId);
  const attraction = await city.createAttraction({
    cityId,
    attraction: attractionPayload.attraction,
    lat: attractionPayload.lat,
    lng: attractionPayload.lng,
  });

  res.json({ message: 'Attraction created', body: attraction });
});

router.delete('/attractions/:attractionId', async (req, res, next) => {
  const { attractionId } = req.params;
  const attraction = await Attraction.findByPk(attractionId);
  const removedAttraction = await attraction.destroy();
  res.json({ message: 'Attraction removed', body: removedAttraction });
});

router.put('/attractions', async (req, res, next) => {
  const { id: attractionId, attraction } = req.body;
  const attractionToUpdate = await Attraction.findByPk(attractionId);
  attractionToUpdate.attraction = attraction;
  await attractionToUpdate.save();
  res.json({ message: `Attraction id: ${attractionId} updated` });
});

// router.put('/addRating', isUserAuthenticated, async (req, res) => {
//   const result = await handleAddRating(req);
//   res.send(result);
// });

module.exports = router;
