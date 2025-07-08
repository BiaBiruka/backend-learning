// SERVICE - Calls the function to interact with DB and deals with business rules
const {
  handleSelectAll,
  handleSelectById,
  handleInsert,
  handleUpdate,
  handleDelete,
  handleSelectByName,
} = require("../repositories/gamesRepository");
const {
  handleInsertStockItem,
  handleDeleteStockItem,
} = require("../repositories/stockRepository");

class GamesService {
  async fetchAllGames() {
    const requestResult = await handleSelectAll.all();
    if (requestResult.length < 1) {
      throw new Error(`No games found.`);
    }
    return requestResult;
  }

  async fetchGameById(id) {
    const requestResult = await handleSelectById.get(id);
    if (!requestResult) {
      throw new Error(`Game not found.`);
    }
    return requestResult;
  }

  async addGame(name, price, currentStock, reorderPoint, orderedReestock) {
    const game = await handleSelectByName.get(name);
    if (game) {
      throw new Error(`'${game.name}' already exists!`);
    }
    const requestResult = await handleInsert.run(name, price);

    // Add stock entry
    const gameId = requestResult.lastInsertRowid;
    const needsReestock = reorderPoint >= currentStock ? 1 : 0;

    await handleInsertStockItem.run(
      gameId,
      currentStock,
      reorderPoint,
      needsReestock,
      orderedReestock
    );
  }

  async editGame(newPrice, id) {
    const game = await handleSelectById.get(id);

    if (game) {
      await handleUpdate.run(newPrice, id);
    } else {
      throw new Error("Game not found.");
    }
  }

  async deleteGame(id) {
    const game = await handleSelectById.get(id);

    if (game) {
      await handleDeleteStockItem.run(id);
      await handleDelete.run(id);
    } else {
      throw new Error("Game not found.");
    }
  }
}

// Sometimes I need to pass parameters before creating the instance. On these scenarios,
// I import the class and create the instance where I need it, passing said parameters
module.exports = { GamesService };
