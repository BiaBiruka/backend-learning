// ROUTES - The existing routes with their methods and controllers they call
const express = require("express");
const GamesController = require("../controllers/gamesController");

const gamesRouter = express.Router();

gamesRouter.get("/", GamesController.fetchAllGames);

gamesRouter.get("/query", GamesController.fetchGameByQuery);

gamesRouter.get("/:id", GamesController.fetchGameByParam);

gamesRouter.post("/", GamesController.addGame);

gamesRouter.put("/:id", GamesController.editGame);

gamesRouter.delete("/:id", GamesController.deleteGame);

module.exports = { gamesRouter };
