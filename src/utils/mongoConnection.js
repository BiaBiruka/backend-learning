const { MongoClient } = require("mongodb");

let mongoConnection = null;
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

const handleFetchMongoInstance = async () => {
  if (mongoConnection) {
    // if instance was already created, returns the instance
    return mongoConnection;
  }

  // If instance was not created, connect to client, access db and then returns the instance (and set as the instance variable)
  await client.connect();
  const dbInstance = client.db("backend-learning");
  mongoConnection = dbInstance;
  return mongoConnection;
};

module.exports = { handleFetchMongoInstance };
