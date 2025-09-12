const { DatabaseSync } = require("node:sqlite");

let sqliteConnection;

const handleFetchSqliteInstance = async () => {
  if (sqliteConnection) {
    return sqliteConnection;
  }

  const database = new DatabaseSync("./sqlitedb.sql");
  sqliteConnection = database;
  return sqliteConnection;
};

module.exports = { handleFetchSqliteInstance };
