// To run, need to use 'node app.js' (to keep watch of the changes, use 'node --watch app.js')
const express = require("express");
const {
  handleInsert,
  handleSelectAll,
  handleSelectById,
  handleDelete,
  handleUpdate,
} = require("./databaseActions");

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () =>
  console.log(`Server successfully running in port ${port}.`)
);

app.get("/games", (_, res) => {
  const result = handleSelectAll.all();
  res.json({ message: `${result.length} result(s) found.`, data: result });
});

app.get("/games/query", (req, res) => {
  const { id } = req.query;
  const result = handleSelectById.all(id);
  res.json({ data: result });
});

app.get("/games/:id", (req, res) => {
  const { id } = req.params;
  const result = handleSelectById.get(id);
  res.json({ data: result });
});

app.post("/games", (req, res) => {
  const { id, name, price } = req.body;
  const result = handleInsert.run(id, name, price);
  res.json({ message: `${result.changes} change(s) were made.` });
});

app.put("/games/:id", (req, res) => {
  const { id } = req.params;
  const { newPrice } = req.body;
  const result = handleUpdate.run(newPrice, id);
  res.json({ message: `${result.changes} change(s) were made.` });
});

app.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  const result = handleDelete.run(id);
  res.json({ message: `${result.changes} change(s) were made.` });
});
