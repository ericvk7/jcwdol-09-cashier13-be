const express = require("express");
const databaseControllers = require("../controllers/databaseControllers");
const upload = require("../middleware/multer");
const routers = express.Router();

routers.get("/get-product", databaseControllers.fetchProduct);
routers.delete("/delet-product/:id", databaseControllers.deletProduct);
//routers.post("/add-product", databaseControllers.addProduct);
routers.get("/get-categories", databaseControllers.fetchCategory);
routers.post("/add-categories", databaseControllers.addCategories);

module.exports = routers;
