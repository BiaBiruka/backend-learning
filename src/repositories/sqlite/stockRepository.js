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
}

// this.dbConnection.exec(
//   `CREATE TABLE IF NOT EXISTS stock(
//     game_id INTEGER PRIMARY KEY,
//     stock INTEGER,
//     reorder_point INTEGER,
//     ordered_reestock INTEGER CHECK (ordered_reestock IN (0,1)),
//     FOREIGN KEY (game_id) REFERENCES games(id)
//   ) STRICT`
// );

// let count = 0;
// for (let i = 1; i < 31; i += 1) {
//   handleInsertStockItem.run(i, 5, 3, 0);
//   count += 1;
// }

module.exports = StockRepository;
