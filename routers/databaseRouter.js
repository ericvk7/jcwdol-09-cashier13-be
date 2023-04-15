const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");

const routers = express.Router();

routers.get("/get-product", databaseControllers.fetchProduct);
routers.get("/get-category", databaseControllers.fetchCategory);

module.exports = routers;
