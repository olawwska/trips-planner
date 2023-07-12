const router = require('express').Router();
const {
  handleAddAttraction,
  handleGetAttractionsForCity,
  handleGetRatingForAttraction,
  handleEditAttraction,
  handleAddRating,
  handleDeleteAttraction,
} = require('../databaseHandlers');

router.post('/addAttraction', async (req, res) => {
  const result = await handleAddAttraction(req);
  res.send({ result });
});

router.get('/getAllAttractions/:cityId', async (req, res) => {
  const result = await handleGetAttractionsForCity(req);
  const attractionsWithRating = await Promise.all(
    result?.map(async (attraction) => {
      const ratingResult = await handleGetRatingForAttraction(attraction.id);
      return {
        ...attraction,
        rating: ratingResult,
      };
    })
  );
  res.send(attractionsWithRating);
});

router.put('/editAttraction', async (req, res) => {
  const result = await handleEditAttraction(req);
  res.send({ result });
});

router.put('/addRating', async (req, res) => {
  const result = await handleAddRating(req);
  res.send(result);
});

router.delete('/deleteAttraction/:attractionId', async (req, res) => {
  const result = await handleDeleteAttraction(req);
  res.send(result);
});

module.exports = router;
