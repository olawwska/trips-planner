let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('appdb.db', (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('Connected to the SQLite database.');
});

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

module.exports = {
  db,
  db_run,
};
