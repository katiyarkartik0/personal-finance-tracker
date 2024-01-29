const express = require("express");
const overviewRoutes = express.Router();
const bodyParser = require("body-parser");
const { getOverview } = require("../controllers/overview");

overviewRoutes.use(bodyParser.urlencoded({ extended: false }));
overviewRoutes.use(bodyParser.json());

overviewRoutes.post("/overview", getOverview);

module.exports = { overviewRoutes };