const { ObjectId } = require("mongodb");

class GamesRepository {
  constructor(database) {
    this.database = database;
  }

  async handleInsert(gameName, gamePrice) {
    await this.database
      .collection("games")
      .insertOne({ name: gameName, price: gamePrice });
  }

  async handleSelectAll() {
    console.log("select all mongo");
    const res = await this.database.collection("games").find({}).toArray();
    return res;
  }

  async handleSelectById(gameId) {
    const res = await this.database
      .collection("games")
      .findOne({ _id: new ObjectId(gameId) });
    return res;
  }

  async handleSelectByName(gameName) {
    const res = await this.database
      .collection("games")
      .findOne({ name: gameName });
    return res;
  }

  async handleDelete(gameId) {
    await this.database
      .collection("games")
      .deleteOne({ _id: new ObjectId(gameId) });
  }

  async handleUpdate(newPrice, gameId) {
    await this.database
      .collection("games")
      .updateOne({ _id: new ObjectId(gameId) }, { $set: { price: newPrice } });
  }

  // async handleInserAll(database) {
  //   const { games } = require("../seed/gamesSeed.js");
  //   await this.database.db("backend-learning").collection("games").insertMany(games);
  // }
}

module.exports = GamesRepository;
