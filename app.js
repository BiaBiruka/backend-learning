// To run, need to use 'node app.js' (to keep watch of the changes, use 'node --watch app.js')
require("dotenv/config");
require("./src/utils/connection");
const express = require("express");
// require("express-async-errors");
const { gamesRouter } = require("./src/routes/gamesRoutes");
const { stockRouter } = require("./src/routes/stockRoutes");

const app = express();
app.use(express.json());

const port = 5000;

app.listen(port, () => {
  console.log(`Server successfully running in port ${port}.`);
});

// TODO - "Insert all" routes (refreshDB)
app.use("/games", gamesRouter);
app.use("/stock", stockRouter);

app.use((error, _, res, __) => {
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: error.message || "Server error",
  });
});
