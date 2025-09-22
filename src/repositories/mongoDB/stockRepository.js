const { ObjectId } = require("mongodb");

class StockRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async fetchFullStock() {
    const res = await this.dbConnection
      .collection("stock")
      .aggregate([
        {
          $lookup: {
            from: "games",
            localField: "game_id",
            foreignField: "_id",
            as: "gameInfo",
          },
        },
        {
          $unwind: {
            path: "$gameInfo",
          },
        },
        {
          $project: {
            stock: 1,
            _id: 0,
            game_id: 1,
            reorder_point: 1,
            ordered_reestock: 1,
            name: "$gameInfo.name",
          },
        },
      ])
      .toArray();
    return res;
  }

  async handleInsertStockItem(stock) {
    await this.dbConnection.collection("stock").insertOne({
      game_id: stock.gameId,
      stock: stock.currentStock,
      reorder_point: stock.reorderPoint,
      ordered_reestock: stock.orderedReestock,
    });
  }

  async handleUpdateStockItem(stock) {
    await this.dbConnection
      .collection("stock")
      .updateOne(
        { game_id: new ObjectId(stock.gameId) },
        { $set: { stock: stock.newStock } }
      );
  }

  async handleDeleteStockItem(gameId) {
    await this.dbConnection
      .collection("stock")
      .deleteOne({ game_id: new ObjectId(gameId) });
  }

  async fetchGameStock(gameId) {
    const res = await this.dbConnection
      .collection("stock")
      .aggregate([
        {
          $match: { game_id: new ObjectId(gameId) }, // find by gameId
        },
        {
          $lookup: {
            // Join
            from: "games", // Join collection 'games'...
            localField: "game_id", // ...where stock field 'game_id'...
            foreignField: "_id", // ...is the same as game colletion '_id'...
            as: "gameInfo", // ...and name data 'gameInfo'
          },
        },
        {
          $unwind: {
            path: "$gameInfo", // separates the result of gameInfo
          },
        },
        {
          $project: {
            stock: 1,
            _id: 0,
            game_id: 1,
            reorder_point: 1,
            ordered_reestock: 1,
            name: "$gameInfo.name", // displays game name as 'name' on the result object
          },
        },
      ])
      .next();
    return res;
  }

  async handleDeleteAll() {
    await this.dbConnection.collection("stock").deleteMany({});
  }

  async handleInsertAll(gameIds) {
    const docsToAdd = gameIds.map((id) => {
      return {
        game_id: id,
        stock: 10,
        reorder_point: 10,
        ordered_reestock: 0,
      };
    });

    await this.dbConnection.collection("stock").insertMany(docsToAdd);
  }
}

module.exports = StockRepository;
