// SERVICE - Calls the function to interact with DB and deals with business rules
const AppError = require("../../AppError");

class GamesService {
  constructor({ gamesRepository, stockRepository }) {
    this.gamesRepository = gamesRepository;
    this.stockRepository = stockRepository;
  }

  async fetchAllGames() {
    const requestResult = await this.gamesRepository.handleSelectAll();
    if (requestResult.length < 1) {
      throw new AppError("No games found.", 404);
    }
    return requestResult;
  }

  async fetchGameById(id) {
    const requestResult = await this.gamesRepository.handleSelectById(id);
    if (!requestResult) {
      throw new AppError("Game not found.", 404);
    }
    return requestResult;
  }

  async addGame(name, price, currentStock, reorderPoint, orderedReestock) {
    const game = await this.gamesRepository.handleSelectByName(name);

    if (game) {
      throw new AppError(`'${game.name}' already exists!`, 409);
    }
    const requestResult = await this.gamesRepository.handleInsert({
      name,
      price,
    });

    // Add stock entry
    const gameId = requestResult.newGameId;
    await this.stockRepository.handleInsertStockItem({
      gameId,
      currentStock,
      reorderPoint,
      orderedReestock,
    });
  }

  async editGame(newPrice, id) {
    const game = await this.gamesRepository.handleSelectById(id);

    if (game) {
      await this.gamesRepository.handleUpdate({ newPrice, id });
    } else {
      throw new AppError("Game not found.", 404);
    }
  }

  async deleteGame(id) {
    const game = await this.gamesRepository.handleSelectById(id);

    if (game) {
      await this.stockRepository.handleDeleteStockItem(id);
      await this.gamesRepository.handleDelete(id);
    } else {
      throw new AppError("Game not found.", 404);
    }
  }
}

// Sometimes I need to pass parameters before creating the instance. On these scenarios,
// I import the class and create the instance where I need it, passing said parameters
module.exports = { GamesService };
