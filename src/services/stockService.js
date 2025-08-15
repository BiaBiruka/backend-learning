const AppError = require("../../AppError");
const {
  handleUpdateStockItem,
  fetchGameStock,
  fetchFulltock,
} = require("../repositories/sqlite/stockRepository");

class StockService {
  async fetchFullStock() {
    const requestResult = await fetchFulltock.all();
    if (requestResult.length < 1) {
      throw new AppError("No stock found.", 404);
    }

    const reestockCheckedResult = requestResult.map((game) => {
      return {
        ...game,
        needs_reestock: game.stock < game.reorder_point,
        ordered_reestock: game.ordered_reestock === 1 ? true : false,
      };
    });
    return reestockCheckedResult;
  }

  async fetchGameStock(gameId) {
    const requestResult = await fetchGameStock.get(gameId);
    if (!requestResult) {
      throw new AppError("Stock for informed game not found.", 404);
    }
    const reestockCheckedResult = {
      ...requestResult,
      needs_reestock: requestResult.stock < requestResult.reorder_point,
      ordered_reestock: requestResult.ordered_reestock === 1 ? true : false,
    };
    return reestockCheckedResult;
  }

  async updateStock(newStock, gameId) {
    const gameStock = await fetchGameStock.get(gameId);

    if (gameStock) {
      await handleUpdateStockItem.run(newStock, gameId);
    } else {
      throw new AppError("Stock for informed game not found.", 404);
    }
  }
}

module.exports = { StockService };
