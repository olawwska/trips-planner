const { db, db_all, db_each, db_run, db_get } = require('./helpers');

// db.run('DROP TABLE IF EXISTS attractionsRating');
// db.run('DROP TABLE IF EXISTS attractions');
// db.run('DROP TABLE IF EXISTS cities');
// db.run('DROP TABLE IF EXISTS users');
// db.run('DROP TABLE IF EXISTS permissions');
db.serialize(() => {
  db_run('CREATE TABLE IF NOT EXISTS cities(cityId integer primary key, city text)');
});

db.serialize(() => {
  db_run(
    'CREATE TABLE IF NOT EXISTS attractions(attractionId integer primary key, attraction text, cityId integer, lat real, lng real, photo text, website text)'
  );
});

db.serialize(() => {
  db_run(
    'CREATE TABLE IF NOT EXISTS attractionsRating(attractionId integer, userId integer PRIMARY KEY, rating real)'
  );
});

db.serialize(() => {
  db_run('CREATE TABLE IF NOT EXISTS users(userId text,userEmail text)');
});

db.serialize(() => {
  db_run(
    'CREATE TABLE IF NOT EXISTS permissions(userId text, cityId number, PRIMARY KEY(userId,cityId))'
  );
});

const handleGetAttractionsForCity = async (req) => {
  const cityId = req.params.cityId;
  const attractionsForACity = await db_all(
    `SELECT attractionId,attraction,lat,lng,photo,website FROM attractions WHERE cityId = '${cityId}'`
  );
  return attractionsForACity;
};

const handleGetRatingForAttraction = (attractionId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT AVG(rating) FROM attractionsRating WHERE attractionId = '${attractionId}'`,
      (err, row) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        let rating = null;
        if (row) {
          rating = Object.values(row)[0];
        }

        return resolve(rating);
      }
    );
  });
};

const handleAddCity = async (req) => {
  const { city } = req.body;
  const { googleId } = req.user;
  let cityId = await db_run(`INSERT INTO cities(city) VALUES('${city}')`);
  db_run(`INSERT INTO permissions(cityId, userId) VALUES('${cityId.lastID}','${googleId}')`);
};

const handleAddAttraction = (req) => {
  const { attraction, cityId, lat, lng, photo, website } = req.body;
  db_run(
    `INSERT INTO attractions(attraction,cityId,lat,lng,photo,website) VALUES('${attraction}','${cityId}','${lat}','${lng}','${photo}','${website}')`
  );
};

const handleAddRating = (req) => {
  const { attractionId, rating } = req.body;
  db_run(
    `INSERT OR REPLACE INTO attractionsRating(attractionId,rating) VALUES('${attractionId}','${rating}')`
  );
};

const handleEditAttraction = (req) => {
  const { attractionId, attraction } = req.body;
  db_run(
    `UPDATE attractions SET attraction = '${attraction}' WHERE attractionId = '${attractionId}'`
  );
};

const handleDeleteCity = (req) => {
  const cityId = req.params.cityId;
  db_run(`DELETE from cities WHERE cityId = '${cityId}'`);
  db_run(`DELETE from attractions WHERE cityId = '${cityId}'`);
};

const handleDeleteAttraction = (req) => {
  const attractionId = req.params.attractionId;
  db_run(`DELETE from attractions WHERE attractionId = '${attractionId}'`);
};

const handleGetCityById = async (cityId) => {
  const city = await db_each(`SELECT city,cityId FROM cities WHERE cityId = '${cityId}'`);
  return city;
};

const handleGetAllCities = async (req) => {
  const { googleId } = req.user;
  const citiesIds = await db_all(`SELECT cityId FROM permissions WHERE userId = '${googleId}'`);
  const cities = await Promise.all(citiesIds.map(({ cityId }) => handleGetCityById(cityId)));
  return cities;
};

module.exports = {
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
};
