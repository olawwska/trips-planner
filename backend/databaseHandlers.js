const { db, db_all, db_each, db_run, db_get } = require('./helpers');

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
    'CREATE TABLE IF NOT EXISTS attractionsRating(attractionId integer, userId text, rating real, PRIMARY KEY(attractionId, userId))'
  );
});

db.serialize(() => {
  db_run('CREATE TABLE IF NOT EXISTS users(userId text,userEmail text,userName text)');
});

db.serialize(() => {
  db_run(
    'CREATE TABLE IF NOT EXISTS permissions(userId text, cityId number, PRIMARY KEY(userId,cityId))'
  );
});

const handleGetAttractionsForCity = async (req) => {
  const cityId = req.params.cityId;
  const { googleId } = req.user;
  const attractionsForACity = await db_all(
    `SELECT attractionId,attraction,lat,lng,photo,website FROM attractions WHERE cityId = '${cityId}'`
  );
  const attractionsWithRating = await Promise.all(
    attractionsForACity.map(async (attraction) => {
      const attrRating = await db_get(
        `SELECT rating from attractionsRating WHERE attractionId = '${attraction.attractionId}' AND userId = '${googleId}'`
      );
      return {
        rating: attrRating?.rating,
        ...attraction,
      };
    })
  );
  return attractionsWithRating;
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
  const { googleId } = req.user;
  const { attractionId, rating } = req.body;
  db_run(
    `INSERT OR REPLACE INTO attractionsRating(attractionId,rating,userId) VALUES('${attractionId}','${rating}','${googleId}')`
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
  db_run(`DELETE from permissions WHERE cityId = '${cityId}'`);
};

const handleDeleteAttraction = (req) => {
  const attractionId = req.params.attractionId;
  db_run(`DELETE from attractions WHERE attractionId = '${attractionId}'`);
};

const handleGetCityById = async (cityId) => {
  const city = await db_get(`SELECT city,cityId FROM cities WHERE cityId = '${cityId}'`);
  return city;
};

const handleGetAllCities = async (req) => {
  const { googleId } = req.user;
  const citiesIds = await db_all(`SELECT cityId FROM permissions WHERE userId = '${googleId}'`);
  const cities = await db_all(
    `SELECT city,cityId FROM cities WHERE cityId IN(${citiesIds
      ?.map(({ cityId }) => cityId)
      .join(',')})`
  );
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
