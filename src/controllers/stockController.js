const { StockService } = require("../services/stockService");

class StockController {
  async fetchFullStock(_, res) {
    try {
      const stockServiceInstance = new StockService();
      const result = await stockServiceInstance.fetchFullStock();
      return res
        .status(200)
        .json({ message: `${result.length} result(s) found.`, data: result });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async fetchGameStock(req, res) {
    try {
      const stockServiceInstance = new StockService();
      const { gameId } = req.params;
      const result = await stockServiceInstance.fetchGameStock(gameId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateStock(req, res) {
    try {
      const stockServiceInstance = new StockService();
      const { gameId } = req.params;
      const { newStock } = req.body;
      await stockServiceInstance.updateStock(newStock, gameId);
      return res.status(200).json({
        message: "Stock updated successfully.",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new StockController();
