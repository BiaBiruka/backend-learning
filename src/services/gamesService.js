// SERVICE - Calls the function to interact with DB and deals with business rules
const {
  handleSelectAll,
  handleSelectById,
  handleInsert,
  handleUpdate,
  handleDelete,
  handleSelectByName,
} = require("../repositories/gamesRepository");

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

  async addGame(name, price) {
    const game = await handleSelectByName.get(name);

    if (game) {
      throw new Error(`'${game.name}' already exists!`);
    }
    const requestResult = await handleInsert.run(name, price);
    return requestResult;
  }

  async editGame(newPrice, id) {
    const game = await handleSelectById.get(id);

    if (game) {
      const requestResult = await handleUpdate.run(newPrice, id);
      return requestResult;
    }
    throw new Error("Game not found.");
  }

  async deleteGame(id) {
    const game = await handleSelectById.get(id);

    if (game) {
      const requestResult = await handleDelete.run(id);
      return requestResult;
    }
    throw new Error("Game not found.");
  }
}

// Sometimes I need to pass parameters before creating the instance. On these scenarios,
// I import the class and create the instance where I need it, passing said parameters
module.exports = { GamesService };
