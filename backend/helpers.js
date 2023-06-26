let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('testdb.db', (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to the in-memory SQLite database.');
});

async function db_all(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(rows);
    });
  });
}

async function db_each(query) {
  return new Promise((resolve, reject) => {
    db.each(query, (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(row);
    });
  });
}

async function db_run(query) {
  return new Promise((resolve, reject) => {
    db.run(query, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(this);
    });
  });
}

async function db_get(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(row);
    });
  });
}

module.exports = {
  db,
  db_all,
  db_each,
  db_run,
  db_get,
};
