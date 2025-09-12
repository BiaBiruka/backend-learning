// REPOSITORY - The actual DB functions
class GamesRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // To run the functions, .all() (or .get() if only one result is expected) is used when data is
  // returned (select) and .run() to run a function that doesn't return data (update, delete, insert)
  handleSelectAll = () => {
    return this.dbConnection
      .prepare(
        "SELECT g.*, s.stock FROM games g JOIN stock s ON s.game_id = g.id  ORDER BY id"
      )
      .all();
  };

  handleInsert = (game) => {
    return this.dbConnection
      .prepare("INSERT INTO games (name, price) VALUES (?, ?)")
      .run(game.name, game.price);
  };

  handleSelectById = (id) => {
    return this.dbConnection
      .prepare(
        "SELECT g.*, s.stock FROM games g JOIN stock s ON s.game_id = g.id WHERE id = ?"
      )
      .get(id);
  };

  handleSelectByName = (name) => {
    return this.dbConnection
      .prepare(
        "SELECT g.*, s.stock FROM games g JOIN stock s ON s.game_id = g.id WHERE LOWER(name) = LOWER(?)"
      )
      .get(name);
  };

  handleDelete = (id) => {
    return this.dbConnection.prepare("DELETE FROM games WHERE id = ?").run(id);
  };

  handleUpdate = (gameData) => {
    return this.dbConnection
      .prepare("UPDATE games SET price = ? WHERE id = ?")
      .run(gameData.newPrice, gameData.id);
  };
}

// // Strict is used in order to not try to autocorrect the data if something is wrong in a insert/update
// this.dbConnection.exec(
//   `CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL) STRICT`
// );
// // Add all data again
// const { games } = require("../seed/gamesSeed.js");
// for (const game of games) {
//   console.log(game);
//   handleInsert.run(game.name, game.price);
// }

module.exports = GamesRepository;
