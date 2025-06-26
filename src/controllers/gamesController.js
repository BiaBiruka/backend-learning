const { GamesService } = require("../services/gamesService");

class GamesController {
  async fetchAllGames(_, res) {
    const gameServiceInstance = new GamesService();
    const result = await gameServiceInstance.fetchAllGames();
    return res
      .status(200)
      .json({ message: `${result.length} result(s) found.`, data: result });
  }

  async fetchGameByQuery(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.query;
    const result = await gameServiceInstance.fetchGame(id);
    return res.status(200).json(result);
  }

  async fetchGameByParam(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;
    const result = await gameServiceInstance.fetchGame(id);
    return res.status(200).json(result);
  }

  async addGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { id, name, price } = req.body;
    const result = await gameServiceInstance.addGame(id, name, price);
    return res.status(200).json(result);
  }

  async editGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;
    const { newPrice } = req.body;
    const result = await gameServiceInstance.editGame(newPrice, id);
    return res.status(200).json(result);
  }

  async deleteGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;
    const result = await gameServiceInstance.deleteGame(id);
    return res.status(200).json(result);
  }
}

// Since it is a class, needs to be instanced. Instead of creating a instance on each file it is imported,
// exports the already created instance
module.exports = new GamesController();
