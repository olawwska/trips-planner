let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('testdb.db', (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to the in-memory SQLite database.');
});

// db.run('DROP TABLE IF EXISTS attractions');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS cities(id integer primary key, city text)', (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
});

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS attractions(id integer primary key, attraction text, cityId integer)',
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

// db.run('DROP TABLE * IF EXISTS');

const handleGetAllCities = () => {
  let cities = [];
  return new Promise((resolve, reject) => {
    db.each(
      'SELECT id,city FROM cities',
      (err, row) => {
        if (err) {
          console.log(err);
          return reject(err.city);
        }
        cities.push({ city: row.city, id: row.id });
      },
      (err) => {
        if (err) {
          console.log(err);
          return reject(err.city);
        }
        resolve(cities);
      }
    );
  });
};

const handleGetAttractionsForCity = (req) => {
  const attractions = [];
  const cityId = req.params.cityId;
  return new Promise((resolve, reject) => {
    db.each(
      `SELECT id,attraction FROM attractions WHERE cityId = '${cityId}'`,
      (err, row) => {
        if (err) {
          console.log(err);
          return reject(err.attraction);
        }
        attractions.push({ attraction: row.attraction, id: row.id });
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

const handleAddCity = (req) => {
  const city = req.body.city;
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO cities(city) VALUES('${city}')`, (err, res) => {
      if (err) {
        console.log(err);
        return reject(err.city);
      }
      return resolve('done');
    });
  });
};

const handleAddAttraction = (req) => {
  const { attraction, cityId } = req.body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO attractions(attraction,cityId) VALUES('${attraction}','${cityId}')`,
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

const handleDeleteCity = (req) => {
  const reqId = req.params.id;
  return new Promise((resolve, reject) => {
    db.run(`DELETE from cities WHERE id = '${reqId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.city);
      }
      return resolve('removed cities');
    });
    db.run(`DELETE from attractions WHERE cityId = '${reqId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.attraction);
      }
      return resolve('removed attractions');
    });
  });
};

const handleDeleteAttraction = (req) => {
  const reqId = req.params.id;
  return new Promise((resolve, reject) => {
    db.run(`DELETE from attractions WHERE id = '${reqId}'`, (err) => {
      if (err) {
        console.log(err);
        return reject(err.attraction);
      }
      return resolve(reqId);
    });
  });
};

module.exports = {
  handleGetAllCities,
  handleAddCity,
  handleDeleteCity,
  handleAddAttraction,
  handleGetAttractionsForCity,
  handleDeleteAttraction,
};
