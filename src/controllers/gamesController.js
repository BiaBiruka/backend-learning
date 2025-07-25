// CONTROLLER - "Breaks" request params, calls the service and deals with return status/messages
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

    const result = await gameServiceInstance.fetchGameById(id);
    return res.status(200).json(result);
  }

  async fetchGameByParam(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;

    const result = await gameServiceInstance.fetchGameById(id);
    return res.status(200).json(result);
  }

  async addGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { name, price, currentStock, reorderPoint, orderedReestock } =
      req.body;
    await gameServiceInstance.addGame(
      name,
      price,
      currentStock,
      reorderPoint,
      orderedReestock
    );

    return res.status(200).json({ message: "Game added successfully" });
  }

  async editGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;
    const { newPrice } = req.body;

    await gameServiceInstance.editGame(newPrice, id);
    return res.status(200).json({
      message: "Game price updated successfully.",
    });
  }

  async deleteGame(req, res) {
    const gameServiceInstance = new GamesService();
    const { id } = req.params;

    await gameServiceInstance.deleteGame(id);
    return res.status(200).json({
      message: "Game deleted successfully.",
    });
  }
}

// Since it is a class, needs to be instanced. Instead of creating a instance on each file it is imported,
// exports the already created instance
module.exports = new GamesController();
