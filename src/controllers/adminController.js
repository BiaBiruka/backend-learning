const GamesRepository = require("../repositories/GamesRepository");
const StockRepository = require("../repositories/StockRepository");
const { handleFetchDatabase } = require("../utils/connection");
const { AdminService } = require("../services/adminService");

class AdminController {
  async resetDatabase(_, res) {
    const dbConnection = await handleFetchDatabase();
    const gamesRepository = GamesRepository.getRepository(dbConnection);
    const stockRepository = StockRepository.getRepository(dbConnection);
    const adminServiceInstance = new AdminService({
      gamesRepository,
      stockRepository,
    });

    await adminServiceInstance.resetDatabase();

    return res
      .status(200)
      .json({ message: "Game and stock tables reset successfully" });
  }
}

module.exports = new AdminController();
