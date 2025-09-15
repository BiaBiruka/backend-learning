// CONTROLLER - "Breaks" request params, calls the service and deals with return status/messages
const GamesRepository = require("../repositories/GamesRepository");
const StockRepository = require("../repositories/StockRepository");
const { GamesService } = require("../services/gamesService");
const { handleFetchDatabase } = require("../utils/connection");

class GamesController {
  async fetchAllGames(_, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });

    const result = await gameServiceInstance.fetchAllGames();
    return res
      .status(200)
      .json({ message: `${result.length} result(s) found.`, data: result });
  }

  async fetchGameByQuery(req, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });
    const { id } = req.query;

    const result = await gameServiceInstance.fetchGameById(id);
    return res.status(200).json(result);
  }

  async fetchGameByParam(req, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });
    const { id } = req.params;

    const result = await gameServiceInstance.fetchGameById(id);
    return res.status(200).json(result);
  }

  async addGame(req, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });
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
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });
    const { id } = req.params;
    const { newPrice } = req.body;

    await gameServiceInstance.editGame(newPrice, id);
    return res.status(200).json({
      message: "Game price updated successfully.",
    });
  }

  async deleteGame(req, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const gameServiceInstance = new GamesService({
      gamesRepository,
      stockRepository,
    });
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
