const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
const app = express();
const { databaseRouter } = require("./routers");

const { log } = require("console");
const { db, query } = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/cashier", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT" + port);
});
