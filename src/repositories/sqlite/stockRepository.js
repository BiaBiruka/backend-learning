database.exec(
  `CREATE TABLE IF NOT EXISTS stock(
    game_id INTEGER PRIMARY KEY,
    stock INTEGER,
    reorder_point INTEGER,
    ordered_reestock INTEGER CHECK (ordered_reestock IN (0,1)),
    FOREIGN KEY (game_id) REFERENCES games(id)
  ) STRICT`
);

const handleInsertStockItem = database.prepare(
  "INSERT INTO stock (game_id, stock, reorder_point, ordered_reestock) VALUES (?, ?, ?, ?)"
);

const handleUpdateStockItem = database.prepare(
  "UPDATE stock SET stock = ? WHERE game_id = ?"
);

const handleDeleteStockItem = database.prepare(
  "DELETE FROM stock WHERE game_id = ?"
);

const fetchGameStock = database.prepare(
  "SELECT g.name, s.* FROM stock s JOIN games g ON s.game_id = g.id WHERE game_id = ?"
);

const fetchFulltock = database.prepare(
  "SELECT g.name, s.* FROM stock s JOIN games g ON s.game_id = g.id"
);

// let count = 0;
// for (let i = 1; i < 31; i += 1) {
//   handleInsertStockItem.run(i, 5, 3, 0);
//   count += 1;
// }

module.exports = {
  handleInsertStockItem,
  handleUpdateStockItem,
  handleDeleteStockItem,
  fetchGameStock,
  fetchFulltock,
};
