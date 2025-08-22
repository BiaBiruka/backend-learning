// To run, need to use 'node app.js' (to keep watch of the changes, use 'node --watch app.js')
const express = require("express");
// require("express-async-errors");
const { gamesRouter } = require("./src/routes/gamesRoutes");
const { stockRouter } = require("./src/routes/stockRoutes");
require("dotenv/config");

const app = express();
app.use(express.json());

const port = 5000;

app.listen(port, () => {
  console.log(`Server successfully running in port ${port}.`);
});
// TODO - Insert all again route
app.use("/games", gamesRouter);
app.use("/stock", stockRouter);

app.use((error, _, res, __) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "Server error",
  });
});
