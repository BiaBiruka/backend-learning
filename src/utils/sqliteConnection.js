const { DatabaseSync } = require("node:sqlite");

let sqliteConnection;

const handleFetchSqliteInstance = async () => {
  if (sqliteConnection) {
    return sqliteConnection;
  }

  const database = new DatabaseSync("./sqlitedb.sql");
  sqliteConnection = database;

  // Strict is used in order to not try to autocorrect the data if something is wrong in a insert/update
  // If tables don't exists, create them on first connection try
  sqliteConnection.exec(
    `CREATE TABLE IF NOT EXISTS games(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL) STRICT`
  );
  sqliteConnection.exec(
    `CREATE TABLE IF NOT EXISTS stock(
        game_id INTEGER PRIMARY KEY,
        stock INTEGER,
        reorder_point INTEGER,
        ordered_reestock INTEGER CHECK (ordered_reestock IN (0,1)),
        FOREIGN KEY (game_id) REFERENCES games(id)
      ) STRICT`
  );

  return sqliteConnection;
};

module.exports = { handleFetchSqliteInstance };
