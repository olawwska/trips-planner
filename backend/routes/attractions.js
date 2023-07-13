const router = require('express').Router();
const {
  handleAddAttraction,
  handleGetAttractionsForCity,
  handleGetRatingForAttraction,
  handleEditAttraction,
  handleAddRating,
  handleDeleteAttraction,
} = require('../databaseHandlers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.post('/addAttraction', async (req, res) => {
  const result = await handleAddAttraction(req);
  res.send({ result });
});

router.get('/getAllAttractions/:cityId', async (req, res) => {
  const result = await handleGetAttractionsForCity(req);
  res.send(result);
});

router.put('/editAttraction', async (req, res) => {
  const result = await handleEditAttraction(req);
  res.send({ result });
});

router.put('/addRating', isUserAuthenticated, async (req, res) => {
  const result = await handleAddRating(req);
  res.send(result);
});

router.delete('/deleteAttraction/:attractionId', async (req, res) => {
  const result = await handleDeleteAttraction(req);
  res.send(result);
});

module.exports = router;
