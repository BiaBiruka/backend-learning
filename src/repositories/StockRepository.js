const sqliteRepo = require("./sqlite/StockRepository");
const mongoRepo = require("./mongoDB/StockRepository");

const stockRepos = {
  sqlite: sqliteRepo,
  mongodb: mongoRepo,
};

class StockRepository {
  getRepository = (dbConnection) => {
    const Repository = stockRepos[process.env.DATABASE];
    return new Repository(dbConnection);
  };
}

module.exports = new StockRepository();
