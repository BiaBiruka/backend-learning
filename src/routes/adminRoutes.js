const express = require("express");
const AdminController = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/reset", AdminController.resetDatabase);

module.exports = { adminRouter };
