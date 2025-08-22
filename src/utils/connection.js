// Depending on which DB is being used, returns the connection function to be used by repositories
const { DatabaseSync } = require("node:sqlite");

const database = async () => {
  if (process.env.DATABASE === "sqlite") {
    // DBs can be stored in file or memory. If using in file should input file path here, else use :memory:
    return new DatabaseSync("./sqlitedb.sql");
  } else if (process.env.DATABASE === "mongodb") {
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri);
    return client.db("backend-learning");
  }
};
