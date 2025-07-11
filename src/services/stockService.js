const {
  handleUpdateStockItem,
  fetchGameStock,
  fetchFulltock,
} = require("../repositories/stockRepository");

class StockService {
  async fetchFullStock() {
    const requestResult = await fetchFulltock.all();
    if (requestResult.length < 1) {
      throw new Error(`404 - No stock found.`);
    }
    return requestResult;
  }

  async fetchGameStock(gameId) {
    const requestResult = await fetchGameStock.get(gameId);
    if (!requestResult) {
      throw new Error(`404 - Stock for informed game not found.`);
    }
    return requestResult;
  }

  async updateStock(newStock, gameId) {
    const gameStock = await fetchGameStock.get(gameId);

    if (gameStock) {
      const needsReestock = newStock <= gameStock.reorder_point ? 1 : 0;

      await handleUpdateStockItem.run(newStock, needsReestock, gameId);
    } else {
      throw new Error(`404 - Stock for informed game not found.`);
    }
  }
}

module.exports = { StockService };
