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

app.get('/getAll', async (req, res) => {
  const result = await handleGetAllCities();
  res.send(result);
});

app.get('/getAllAttractions/:cityId', async (req, res) => {
  const result = await handleGetAttractionsForCity(req);
  res.send(result);
});

app.put('/editAttraction', async (req, res) => {
  const result = await handleEditAttraction(req);
  res.send({ result });
});

app.delete('/deleteCity/:id', async (req, res) => {
  const result = await handleDeleteCity(req);
  res.send(result);
});

app.delete('/deleteAttraction/:id', async (req, res) => {
  const result = await handleDeleteAttraction(req);
  res.send(result);
});

app.get('/getCityById/:cityId', async (req, res) => {
  const result = await handleGetCityById(req);
  res.send(result);
});

app.listen(8000, function () {});
