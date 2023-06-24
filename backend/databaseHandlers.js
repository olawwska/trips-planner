let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('testdb.db', (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to the in-memory SQLite database.');
});

// db.run('DROP TABLE IF EXISTS attractionsRating');
// db.run('DROP TABLE IF EXISTS attractions');
// db.run('DROP TABLE IF EXISTS cities');
// db.run('DROP TABLE IF EXISTS users');
// db.run('DROP TABLE IF EXISTS permissions');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS cities(cityId integer primary key, city text)', (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS attractions(attractionId integer primary key, attraction text, cityId integer, lat real, lng real, photo text, website text)',
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS attractionsRating(attractionId integer, userId integer PRIMARY KEY, rating real)',
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users(userId text)', (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS permissions(userId text, cityId number, PRIMARY KEY(userId,cityId))',
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

const handleAddUser = (req) => {
  const { userEmail } = req.body;
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO users(userId) VALUES('${userEmail}')`, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve('user added');
    });
  });
};

const handleGetAttractionsForCity = (req) => {
  const attractions = [];
  const cityId = req.params.cityId;
  return new Promise((resolve, reject) => {
    db.each(
      `SELECT attractionId,attraction,lat,lng,photo,website FROM attractions WHERE cityId = '${cityId}'`,
      (err, row) => {
        if (err) {
          console.log(err);
          return reject(err.attraction);
        }
        attractions.push({
          attraction: row.attraction,
          attractionId: row.attractionId,
          lat: row.lat,
          lng: row.lng,
          photo: row.photo,
          website: row.website,
        });
      },
      (err) => {
        if (err) {
          console.log(err);
          return reject(err.attraction);
        }
        return resolve(attractions);
      }
    );
  });
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
  const { city, userId } = req.body;
  let cityId;
  return Promise.all([
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO cities(city) VALUES('${city}')`, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }
        cityId = this.lastID;
        resolve('added city');
      });
      return cityId;
    }),
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO permissions(cityId, userId) VALUES('${cityId}','${userId}')`, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve('added permission');
      });
    }),
  ]);
};

const handleAddAttraction = (req) => {
  const { attraction, cityId, lat, lng, photo, website } = req.body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO attractions(attraction,cityId,lat,lng,photo,website) VALUES('${attraction}','${cityId}','${lat}','${lng}','${photo}','${website}')`,
      (err, res) => {
        if (err) {
          console.log(err);
          return reject(err.attraction);
        }
        return resolve('done');
      }
    );
  });
};

const handleAddRating = (req) => {
  const { attractionId, rating } = req.body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO attractionsRating(attractionId,rating) VALUES('${attractionId}','${rating}')`,
      (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve('rating added');
      }
    );
  });
};

const handleEditAttraction = (req) => {
  const { attractionId, attraction } = req.body;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE attractions SET attraction = '${attraction}' WHERE attractionId = '${attractionId}'`,
      (err) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve('done');
      }
    );
  });
};

const handleDeleteCity = (req) => {
  const cityId = req.params.cityId;
  return new Promise((resolve, reject) => {
    db.run(`DELETE from cities WHERE cityId = '${cityId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.city);
      }
      return resolve('removed cities');
    });
    db.run(`DELETE from attractions WHERE cityId = '${cityId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.attraction);
      }
      return resolve('removed attractions');
    });
  });
};

const handleDeleteAttraction = (req) => {
  const attractionId = req.params.attractionId;
  return new Promise((resolve, reject) => {
    db.run(`DELETE from attractions WHERE attractionId = '${attractionId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.attraction);
      }
      return resolve(attractionId);
    });
  });
};

const handleGetCityById = (cityId) => {
  return new Promise((resolve, reject) => {
    db.each(`SELECT city,cityId FROM cities WHERE cityId = '${cityId}'`, (err, row) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(row);
    });
  });
};

const handleGetAllCities = async (req) => {
  const { userId } = req.params;
  let citiesIds = [];
  return Promise.all([
    await new Promise((resolve, reject) => {
      db.each(`SELECT cityId FROM permissions WHERE userId = '${userId}'`, (err, row) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        citiesIds.push(row.cityId);
        resolve(citiesIds);
      });
    }),
    await new Promise(async (resolve) => {
      const cities = citiesIds.map((cityId) => handleGetCityById(cityId));
      const resolvedCities = await Promise.all(cities);
      resolve(resolvedCities);
    }),
  ]);
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
  handleAddUser,
};
