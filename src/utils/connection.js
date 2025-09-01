const { GamesRepository } = require("../repositories/sqlite/gamesRepository");

// Returns the correct repository
const repository = async () => {
  if (process.env.DATABASE === "sqlite") {
    return new GamesRepository();
  } else if (process.env.DATABASE === "mongodb") {
    // const uri = process.env.MONGO_URL;
    // const client = new MongoClient(uri);
    // return client.db("backend-learning");
  }
};
