const express = require("express");
const StockController = require("../controllers/stockController");

const stockRouter = express.Router();

stockRouter.get("/", StockController.fetchFullStock);

stockRouter.get("/:gameId", StockController.fetchGameStock);

stockRouter.put("/:gameId", StockController.updateStock);

module.exports = { stockRouter };
