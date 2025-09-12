const { ObjectId } = require("mongodb");

class StockRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }
}

module.exports = StockRepository;
