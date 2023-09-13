const router = require('express').Router();
const sequelize = require('sequelize');
const {
  // handleAddAttraction,
  // handleGetAttractionsForCity,
  // handleGetRatingForAttraction,
  // handleEditAttraction,
  // handleAddRating,
  // handleDeleteAttraction,
} = require('../databaseHandlers');
const { isUserAuthenticated } = require('../middlewares/auth');
const { City, Attraction, AttractionsRating } = require('../db/models');

router.get('/:cityId/attractions', async (req, res, next) => {
  const { cityId } = req.params;
  const attractionsWithRating = await Attraction.findAll({
    where: { cityId: cityId },
    attributes: {
      include: [[sequelize.fn('AVG', sequelize.col('AttractionsRatings.rating')), 'rating']],
    },
    include: {
      model: AttractionsRating,
      attributes: [],
    },
    raw: true,
    group: ['Attraction.id'],
  });

  res.json(attractionsWithRating);
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

router.post('/rating/:attractionId', isUserAuthenticated, async (req, res, next) => {
  const { googleId } = req.user;
  const { rating } = req.body;
  const { attractionId } = req.params;
  const attraction = await Attraction.findByPk(attractionId);
  const attractionRating = await AttractionsRating.findOne({
    where: { attractionId: attractionId },
  });
  if (!Boolean(attractionRating)) {
    try {
      const newAttractionsRating = await attraction.createAttractionsRating({
        attractionId: parseInt(attractionId),
        rating: rating,
        googleId: parseInt(googleId),
      });

      return res
        .status(200)
        .json({ message: 'Attractions rating added', body: { newAttractionsRating } });
    } catch {
      console.log(err, req.body);
      return res.status(404).json({ message: 'Failed to add rating' });
    }
  }
});

module.exports = router;
