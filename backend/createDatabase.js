const sqlite3 = require("sqlite3").verbose()

let db = new sqlite3.Database("testdb.db", (err) => {
  if (err) {
    return console.log(err.message)
  }
  console.log("Connected to the in-memory SQLite database.")
})

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS messages(id integer primary key, message text)",
    (err) => {
      if (err) {
        console.log(err)
        throw err
      }
    }
  )
})

db.close()
