let express = require('express');
let cors = require('cors');
const {
  handleGetAllCities,
  handleAddCity,
  handleDeleteCity,
  handleAddAttraction,
  handleGetAttractionsForCity,
  handleDeleteAttraction,
  handleGetCityById,
  handleEditAttraction,
  handleAddRating,
  handleGetRatingForAttraction,
  handleAddUser,
} = require('./databaseHandlers');

let app = express();

app.use(cors());

app.use(express.json());

app.post('/addCity', async (req, res) => {
  const result = await handleAddCity(req);
  res.send({ result });
});

app.post('/addAttraction', async (req, res) => {
  const result = await handleAddAttraction(req);
  res.send({ result });
});

app.post('/addUser', async (req, res) => {
  const result = await handleAddUser(req);
  res.send({ result });
});

app.get('/getAllCities/:userId', async (req, res) => {
  const result = await handleGetAllCities(req);
  res.send(result);
});

app.get('/getAllAttractions/:cityId', async (req, res) => {
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

app.put('/editAttraction', async (req, res) => {
  const result = await handleEditAttraction(req);
  res.send({ result });
});

app.put('/addRating', async (req, res) => {
  const result = await handleAddRating(req);
  res.send(result);
});

app.delete('/deleteCity/:cityId', async (req, res) => {
  const result = await handleDeleteCity(req);
  res.send(result);
});

app.delete('/deleteAttraction/:attractionId', async (req, res) => {
  const result = await handleDeleteAttraction(req);
  res.send(result);
});

app.get('/getCityById/:cityId', async (req, res) => {
  const result = await handleGetCityById(req);
  res.send(result);
});

app.listen(8000, function () {});

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});
