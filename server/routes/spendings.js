const express = require("express");
const spendingRoutes = express.Router();
const bodyParser = require("body-parser");
const { getOverview } = require("../controllers/spending");

spendingRoutes.use(bodyParser.urlencoded({ extended: false }));
spendingRoutes.use(bodyParser.json());

spendingRoutes.get("/overview", getOverview);

module.exports = { spendingRoutes };