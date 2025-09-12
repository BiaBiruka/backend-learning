const { MongoClient } = require("mongodb");

const handleFetchDatabase = async () => {
  if (process.env.DATABASE === "sqlite") {
    const { DatabaseSync } = require("node:sqlite");
    const database = new DatabaseSync("./sqlitedb.sql");
    return database;
  } else if (process.env.DATABASE === "mongodb") {
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("backend-learning");
    return db;
  }
};

module.exports = { handleFetchDatabase };
