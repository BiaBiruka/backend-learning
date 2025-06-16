// To run, need to use 'node app.js' (to keep watch of the changes, use 'node --watch app.js')
const express = require("express");

const app = express();

const mockDatabase = [
  {
    id: 1,
    name: "test",
  },
];

const port = 3000;

app.listen(port, () =>
  console.log(`Server successfully running in port ${port}.`)
);

app.get("/products", (req, res) => {
  console.log("get route!");
});

app.post("/products", (req, res) => {
  console.log("post route!");
});

app.put("/products/query", (req, res) => {
  console.log("put route!");
});

app.put("/products/:id", (req, res) => {
  console.log("put route (again)!");
});

app.delete("/products/:id", (req, res) => {
  console.log("delete route!");
});
