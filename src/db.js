const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

module.exports = {
  // sqlite3 does not support async/await then need to create an async function with a promise
  allAsync: (query) =>
    new Promise(function (resolve, reject) {
      db.all(query, function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    }),

  oneAsync: (query, params) =>
    new Promise(function (resolve, reject) {
      db.all(query, params, function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    }),

  runAsync: (query, params) =>
    new Promise(function (resolve, reject) {
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    }),
  db,
};
