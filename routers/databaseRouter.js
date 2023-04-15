const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");

const routers = express.Router();

routers.get("/get-product", databaseControllers.fetchProduct);
routers.get("/get-categories", databaseControllers.fetchCategory);
routers.post("/add-product", databaseControllers.addProduct);
routers.post("/add-categories", databaseControllers.addCategories);

module.exports = routers;
