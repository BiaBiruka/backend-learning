const { ObjectId } = require("mongodb");
const { handleFetchDatabase } = require("../../utils/connection");
const database = handleFetchDatabase();

class GamesRepository {
  async handleInsert(gameName, gamePrice) {
    await database
      .collection("games")
      .insertOne({ name: gameName, price: gamePrice });
  }

  async handleSelectAll() {
    console.log("select all mongo");
    const res = await database.collection("games").find({}).toArray();
    return res;
  }

  async handleSelectById(gameId) {
    const res = await database
      .collection("games")
      .findOne({ _id: new ObjectId(gameId) });
    return res;
  }

  async handleSelectByName(gameName) {
    const res = await database.collection("games").findOne({ name: gameName });
    return res;
  }

  async handleDelete(gameId) {
    await database.collection("games").deleteOne({ _id: new ObjectId(gameId) });
  }

  async handleUpdate(newPrice, gameId) {
    await database
      .collection("games")
      .updateOne({ _id: new ObjectId(gameId) }, { $set: { price: newPrice } });
  }

  // async handleInserAll(database) {
  //   const { games } = require("../seed/gamesSeed.js");
  //   await database.db("backend-learning").collection("games").insertMany(games);
  // }
}

module.exports = GamesRepository;
