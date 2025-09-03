const { MongoClient } = require("mongodb");

// Returns the correct repository
const handleFetchDatabase = () => {
  if (process.env.DATABASE === "sqlite") {
    const { DatabaseSync } = require("node:sqlite");
    const database = new DatabaseSync("./sqlitedb.sql");
    return database;
  } else if (process.env.DATABASE === "mongodb") {
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri);
    return client.db("backend-learning");
  }
};

module.exports = { handleFetchDatabase };
