const { games } = require("../seed/gamesSeed.js");

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
    const res = this.dbConnection
      .prepare("INSERT INTO games (name, price) VALUES (?, ?)")
      .run(game.name, game.price);
    return { newGameId: res.lastInsertRowid };
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

  handleDeleteAll() {
    this.dbConnection.prepare("DELETE FROM games").run();
  }

  handleInsertAll = () => {
    const insertedIdsArray = [];

    games.forEach((game) => {
      const { newGameId } = this.handleInsert(game);
      insertedIdsArray.push(newGameId);
    });

    return insertedIdsArray;
  };
}

module.exports = GamesRepository;
