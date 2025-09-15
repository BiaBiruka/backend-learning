const StockRepository = require("../repositories/StockRepository");
const { StockService } = require("../services/stockService");
const { handleFetchDatabase } = require("../utils/connection");

class StockController {
  async fetchFullStock(_, res) {
    const dbConnection = await handleFetchDatabase();
    const stockRepository = StockRepository.getRepository(dbConnection);
    const stockServiceInstance = new StockService({ stockRepository });
    const result = await stockServiceInstance.fetchFullStock();
    return res
      .status(200)
      .json({ message: `${result.length} result(s) found.`, data: result });
  }

  async fetchGameStock(req, res) {
    const dbConnection = await handleFetchDatabase();
    const stockRepository = StockRepository.getRepository(dbConnection);
    const stockServiceInstance = new StockService({ stockRepository });
    const { gameId } = req.params;
    const result = await stockServiceInstance.fetchGameStock(gameId);
    return res.status(200).json(result);
  }

  async updateStock(req, res) {
    const dbConnection = await handleFetchDatabase();
    const stockRepository = StockRepository.getRepository(dbConnection);
    const stockServiceInstance = new StockService({ stockRepository });
    const { gameId } = req.params;
    const { newStock } = req.body;
    await stockServiceInstance.updateStock(newStock, gameId);
    return res.status(200).json({
      message: "Stock updated successfully.",
    });
  }
}

module.exports = new StockController();
