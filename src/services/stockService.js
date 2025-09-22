const AppError = require("../../AppError");

class StockService {
  constructor({ stockRepository }) {
    this.stockRepository = stockRepository;
  }

  async fetchFullStock() {
    const requestResult = await this.stockRepository.fetchFullStock();
    if (requestResult.length < 1) {
      throw new AppError("No stock found.", 404);
    }

    const reestockCheckedResult = requestResult.map((game) => {
      return {
        ...game,
        needs_reestock: game.stock < game.reorder_point,
        ordered_reestock: Boolean(game.ordered_reestock),
      };
    });
    return reestockCheckedResult;
  }

  async fetchGameStock(gameId) {
    const requestResult = await this.stockRepository.fetchGameStock(gameId);
    if (!requestResult) {
      throw new AppError("Stock for informed game not found.", 404);
    }
    const reestockCheckedResult = {
      ...requestResult,
      needs_reestock: requestResult.stock < requestResult.reorder_point,
      ordered_reestock: Boolean(requestResult.ordered_reestock),
    };
    return reestockCheckedResult;
  }

  async updateStock(newStock, gameId) {
    const gameStock = await this.stockRepository.fetchGameStock(gameId);

    if (gameStock) {
      await this.stockRepository.handleUpdateStockItem({ newStock, gameId });
    } else {
      throw new AppError("Stock for informed game not found.", 404);
    }
  }
}

module.exports = { StockService };
