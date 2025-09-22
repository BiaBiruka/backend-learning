class StockRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  handleInsertStockItem = (stock) => {
    return this.dbConnection
      .prepare(
        "INSERT INTO stock (game_id, stock, reorder_point, ordered_reestock) VALUES (?, ?, ?, ?)"
      )
      .run(
        stock.gameId,
        stock.currentStock,
        stock.reorderPoint,
        stock.orderedReestock
      );
  };

  handleUpdateStockItem = (stock) => {
    return this.dbConnection
      .prepare("UPDATE stock SET stock = ? WHERE game_id = ?")
      .run(stock.newStock, stock.gameId);
  };

  handleDeleteStockItem = (gameId) => {
    return this.dbConnection
      .prepare("DELETE FROM stock WHERE game_id = ?")
      .run(gameId);
  };

  fetchGameStock = (gameId) => {
    return this.dbConnection
      .prepare(
        "SELECT g.name, s.* FROM stock s JOIN games g ON s.game_id = g.id WHERE game_id = ?"
      )
      .get(gameId);
  };

  fetchFullStock = () => {
    return this.dbConnection
      .prepare(
        "SELECT g.name, s.* FROM stock s JOIN games g ON s.game_id = g.id"
      )
      .all();
  };

  async handleDeleteAll() {
    this.dbConnection.prepare("DELETE FROM stock").run();
  }

  async handleInsertAll(gameIds) {
    gameIds.map((id) =>
      this.handleInsertStockItem({
        gameId: id,
        currentStock: 10,
        reorderPoint: 10,
        orderedReestock: 0,
      })
    );
  }
}

module.exports = StockRepository;
