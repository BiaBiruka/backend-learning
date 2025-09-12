const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;
const dbName = "backend-learning";

const client = new MongoClient(uri);

let dbInstance = null;

const mongoDbInstance = async () => {
  // Se a instância já existe, apenas a retorne
  if (dbInstance) {
    return dbInstance;
  }

  try {
    await client.connect();
    console.log("Connected!");

    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error("It's was not possible to connect", error);
    process.exit(1);
  }
};

module.exports = { mongoDbInstance };
