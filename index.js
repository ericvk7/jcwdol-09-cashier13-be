const express = require("express");
const PORT = 8001;
const app = express();
const { db, query } = require("./database");
const cors = require("cors");
const { authRoutes } = require("./routes");
const { body, validationResult } = require("express-validator");
const { request } = require("express");
const { databaseRouter } = require("./routers");
const upload = require("./middleware/multer");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post(
  "/validation",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    res.status(200).send(req.body);
  }
);

app.use("/auth", authRoutes);

/////////////////////////////////
////////////    POST ////////////
////////////////////////////////
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

/////////////////////////////////
////////////  PATCH   ///////////
////////////////////////////////
app.post("/edit", upload.single("file"), async (req, res) => {
  const { file } = req;
  const filepath = file ? "/" + file.filename : null;
  let data = JSON.parse(req.body.data);
  const {
    idProduct,
    nameProduct,
    priceProduct,
    descriptionProduct,
    idUserProduct,
    idCategoryProduct,
  } = data;
  console.log(filepath);
  console.log(data);
  res.status(200).send({ filepath });

  let reponse = await query(
    `UPDATE products SET imgPath = ${db.escape(filepath)}, name = ${db.escape(
      nameProduct
    )}, price = ${db.escape(priceProduct)}, description = ${db.escape(
      descriptionProduct
    )}, id_categories = ${db.escape(
      idCategoryProduct
    )} WHERE id_products = ${db.escape(idProduct)}`
  );
  //res.status(200).send({ filepath });
}),
  app.use("/cashier", databaseRouter);

app.listen(PORT, () => {
  console.log("SERVER RUNNING IN PORT " + PORT);
});
