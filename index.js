const { request } = require("express");
const express = require("express");
const cors = require("cors");
const port = 8001;
const app = express();
const { databaseRouter } = require("./routers");
const upload = require("./middleware/multer");

const { log } = require("console");
const { db, query } = require("./database");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;
  let data = JSON.parse(req.body.data);
  const {
    nameProduct,
    priceProduct,
    descriptionProduct,
    idUserProduct,
    idCategoryProduct,
  } = data;
  console.log(idUserProduct);
  console.log(data);
  res.status(200).send({ filepath });

  let fetchQuerry = `INSERT INTO products VALUES (null, ${db.escape(
    nameProduct
  )}, ${db.escape(priceProduct)},${db.escape(filepath)}, ${db.escape(
    descriptionProduct
  )}, ${db.escape(idUserProduct)}, ${db.escape(idCategoryProduct)})`;

  db.query(fetchQuerry, (err, result) => {
    if (err) {
      return response.status(400).send(err.message);
    } else {
      let fatchquerry = "SELECT * FROM products";
      db.query(fatchquerry, (err, result) => {
        // return response.status(200).send(result);
      });
    }
  });

  // let response = await query(
  //   `UPDATE products SET imgPath = ${db.escape(
  //     filepath
  //   )} WHERE id_products = ${db.escape(data.id)}`
  // );

  // res.status(200).send({ filepath });

  // let response = await query(
  //   `INSERT INTO products VALUES (null, ${db.escape(nameProduct)}, ${db.escape(
  //     priceProduct
  //   )},${db.escape(filepath)}, ${db.escape(descriptionProduct)}, ${db.escape(
  //     idUserProduct
  //   )}, ${db.escape(idCategoryProduct)})`
  // );

  // res.status(200).send(res);
});

app.use("/cashier", databaseRouter);

app.listen(port, () => {
  console.log("SERVER RUNNING IN PORT " + port);
});
