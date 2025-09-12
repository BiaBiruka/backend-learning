const { DatabaseSync } = require("node:sqlite");

let sqLiteInstance = null;

const sqLiteDbConnection = () => {
  if (sqLiteInstance) {
    return sqLiteInstance;
  }
  sqLiteInstance = new DatabaseSync("./sqlitedb.sql");

  return sqLiteInstance;
};

module.exports = { sqLiteDbConnection };
