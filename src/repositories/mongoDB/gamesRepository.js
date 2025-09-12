const { ObjectId } = require("mongodb");

class GamesRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async handleInsert(gameName, gamePrice) {
    await this.dbConnection
      .collection("games")
      .insertOne({ name: gameName, price: gamePrice });
  }

  async handleSelectAll() {
    console.log("select all mongo");
    const res = await this.dbConnection.collection("games").find({}).toArray();
    return res;
  }

  async handleSelectById(gameId) {
    const res = await this.dbConnection
      .collection("games")
      .findOne({ _id: new ObjectId(gameId) });
    return res;
  }

  async handleSelectByName(gameName) {
    const res = await this.dbConnection
      .collection("games")
      .findOne({ name: gameName });
    return res;
  }

  async handleDelete(gameId) {
    await this.dbConnection
      .collection("games")
      .deleteOne({ _id: new ObjectId(gameId) });
  }

  async handleUpdate(newPrice, gameId) {
    await this.dbConnection
      .collection("games")
      .updateOne({ _id: new ObjectId(gameId) }, { $set: { price: newPrice } });
  }

  // async handleInserAll(this.dbConnection) {
  //   const { games } = require("../seed/gamesSeed.js");
  //   await this.dbConnection.db("backend-learning").collection("games").insertMany(games);
  // }
}

module.exports = GamesRepository;
