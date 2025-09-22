const { ObjectId } = require("mongodb");
const { games } = require("../seed/gamesSeed.js");

class GamesRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async handleInsert(game) {
    const res = await this.dbConnection
      .collection("games")
      .insertOne({ name: game.name, price: game.price });
    return { newGameId: res.insertedId };
  }

  async handleSelectAll() {
    const res = await this.dbConnection
      .collection("games")
      .aggregate([
        {
          $lookup: {
            from: "stock",
            localField: "_id",
            foreignField: "game_id",
            as: "stockInfo",
          },
        },
        {
          $unwind: {
            path: "$stockInfo",
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            stock: "$stockInfo.stock",
          },
        },
      ])
      .toArray();
    return res;
  }

  async handleSelectById(gameId) {
    const res = await this.dbConnection
      .collection("games")
      .aggregate([
        { $match: { _id: new ObjectId(gameId) } },
        {
          $lookup: {
            from: "stock",
            localField: "_id",
            foreignField: "game_id",
            as: "stockInfo",
          },
        },
        {
          $unwind: {
            path: "$stockInfo",
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            stock: "$stockInfo.stock",
          },
        },
      ])
      .next();
    return res;
  }

  async handleSelectByName(gameName) {
    const res = await this.dbConnection
      .collection("games")
      .aggregate([
        {
          $match: {
            name: { $regex: `^${gameName}$`, $options: "i" },
          },
        },
        {
          $lookup: {
            from: "stock",
            localField: "_id",
            foreignField: "game_id",
            as: "stockInfo",
          },
        },
        {
          $unwind: {
            path: "$stockInfo",
          },
        },
        {
          $project: {
            name: 1,
            price: 1,
            stock: "$stockInfo.stock",
          },
        },
      ])
      .next();

    return res;
  }

  async handleDelete(id) {
    await this.dbConnection
      .collection("games")
      .deleteOne({ _id: new ObjectId(id) });
  }

  async handleUpdate(gameData) {
    await this.dbConnection
      .collection("games")
      .updateOne(
        { _id: new ObjectId(gameData.id) },
        { $set: { price: gameData.newPrice } }
      );
  }

  async handleDeleteAll() {
    await this.dbConnection.collection("games").deleteMany({});
  }

  async handleInsertAll() {
    const { insertedIds } = await this.dbConnection
      .collection("games")
      .insertMany(games);

    const insertedIdsArray = Object.values(insertedIds);
    return insertedIdsArray;
  }
}

module.exports = GamesRepository;
