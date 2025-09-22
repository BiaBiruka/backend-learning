class AdminService {
  constructor({ gamesRepository, stockRepository }) {
    this.gamesRepository = gamesRepository;
    this.stockRepository = stockRepository;
  }

  async resetDatabase() {
    console.log("Deleting stock data...");
    await this.stockRepository.handleDeleteAll();

    console.log("Deleting games data...");
    await this.gamesRepository.handleDeleteAll();

    console.log("Adding games data...");
    const newGameIds = await this.gamesRepository.handleInsertAll();

    console.log("Adding stock data...");
    await this.stockRepository.handleInsertAll(newGameIds);
  }
}

module.exports = { AdminService };
