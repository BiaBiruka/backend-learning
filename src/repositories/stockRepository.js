const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("./db.sql");

database.exec(
  `CREATE TABLE IF NOT EXISTS stock(
    game_id INTEGER PRIMARY KEY,
    stock INTEGER,
    reorder_point INTEGER,
    needs_reestock INTEGER CHECK (needs_reestock IN (0,1)),
    ordered_reestock INTEGER CHECK (ordered_reestock IN (0,1)),
    FOREIGN KEY (game_id) REFERENCES games(id)
  ) STRICT`
);

const handleInsertStock = database.prepare(
  "INSERT INTO stock (game_id, stock, reorder_point, needs_reestock, ordered_reestock) VALUES (?, ?, ?, ?, ?)"
);

// let count = 0;
// for (let i = 1; i < 31; i += 1) {
//   handleInsertStock.run(i, 5, 3, 0, 0);
//   count += 1;
// }

module.exports = {
  handleInsertStock,
};
