// To run, need to use 'node app.js' (to keep watch of the changes, use 'node --watch app.js')
const express = require("express");
const { gamesRouter } = require("./src/routes/gamesRoutes");

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () =>
  console.log(`Server successfully running in port ${port}.`)
);

app.use("/games", gamesRouter);
