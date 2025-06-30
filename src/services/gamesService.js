// SERVICE - Calls the function to interact with DB and deals with business rules
const {
  handleSelectAll,
  handleSelectById,
  handleInsert,
  handleUpdate,
  handleDelete,
} = require("../repositories/gamesRepository");

class GamesService {
  async fetchAllGames() {
    const requestResult = handleSelectAll.all();
    return requestResult;
  }

  async fetchGame(id) {
    const requestResult = handleSelectById.get(id);
    return requestResult;
  }

  async addGame(name, price) {
    const requestResult = handleInsert.run(name, price);
    return requestResult;
  }

  async editGame(newPrice, id) {
    const requestResult = handleUpdate.run(newPrice, id);
    return requestResult;
  }

  async deleteGame(id) {
    const requestResult = handleDelete.run(id);
    return requestResult;
  }
}

// Sometimes I need to pass parameters before creating the instance. On these scenarios,
// I import the class and create the instance where I need it, passing said parameters
module.exports = { GamesService };
