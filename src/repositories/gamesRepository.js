// REPOSITORY - The actual DB functions

// Strict is used in order to not try to autocorrect the data if something is wrong in a insert/update
const { DatabaseSync } = require("node:sqlite");

// DBs can be stored in file or memory. If using in file should input file path here, else use :memory:
const database = new DatabaseSync("./db.sql");

database.exec(
  `CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL) STRICT`
);

// prepare the function
const handleInsert = database.prepare(
  "INSERT INTO games (name, price) VALUES (?, ?)"
);

const handleSelectAll = database.prepare("SELECT * FROM games ORDER BY id");

const handleSelectById = database.prepare("SELECT * FROM games WHERE id = ?");

const handleDelete = database.prepare("DELETE FROM games WHERE id = ?");

const handleUpdate = database.prepare(
  "UPDATE games SET price = ? WHERE id = ?"
);

// // Add all data again
// const { games } = require("./seed/gamesSeed.js");
// for (const game of games) {
//   handleInsert.run(game.name, game.price);
// }

// To run the functions, .all() (or .get() if only one result is expected) is used when data is
// returned (select) and .run() to run a function that doesn't return data (update, delete, insert)
module.exports = {
  handleInsert,
  handleSelectAll,
  handleSelectById,
  handleDelete,
  handleUpdate,
};
