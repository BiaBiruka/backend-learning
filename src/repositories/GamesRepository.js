const sqliteRepo = require("./sqlite/GamesRepository");
const mongoRepo = require("./mongoDB/GamesRepository");

const gamesRepos = {
  sqlite: sqliteRepo,
  mongodb: mongoRepo,
};

class GamesRepository {
  getRepository = () => {
    const Repository = gamesRepos[process.env.DATABASE];
    return new Repository();
  };
}

module.exports = new GamesRepository();
