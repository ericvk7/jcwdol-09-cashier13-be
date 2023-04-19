const { db, querry } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { log } = require("util");

module.exports = {
  fetchProduct: async (request, response) => {
    let fetchQuerry = `SELECT * FROM db_jcwdol_mini_cashier_13.products`;
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  deletProduct: async (request, response) => {
    let idParams = request.params.id;
    console.log(idParams);
    let fetchQuerry = `DELETE FROM db_jcwdol_mini_cashier_13.products WHERE id_products = ${db.escape(
      idParams
    )}`;
    db.query(fetchQuerry, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes delete data" });
        alert(response.data.message);
      }
    });
  },

  fetchCategory: async (request, response) => {
    let fetchQuerry = `SELECT * FROM db_jcwdol_mini_cashier_13.categories`;
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  // addProduct: async (request, response) => {
  //   const { name, price, description, imgPath, id_users, id_categories } =
  //     request.body;

  //   const { file } = request;
  //   const filepath = file ? "/" + file.filename : null;

  //   console.log(filepath);

  //   let fetchQuerry = `INSERT INTO products VALUES (null, ${db.escape(
  //     name
  //   )}, ${db.escape(price)},${db.escape(imgPath)}, ${db.escape(
  //     description
  //   )}, ${db.escape(id_users)}, ${db.escape(id_categories)})`;
  //   db.query(fetchQuerry, (err, result) => {
  //     if (err) {
  //       return response.status(400).send(err.message);
  //     } else {
  //       let fatchquerry = "SELECT * FROM products";
  //       db.query(fatchquerry, (err, result) => {
  //         return response.status(200).send(result);
  //       });
  //     }
  //   });
  // },

  addCategories: async (request, response) => {
    const { name, id_users } = request.body;

    let fetchQuerry = `INSERT INTO categories VALUES (null, ${db.escape(
      name
    )},${db.escape(id_users)})`;
    db.query(fetchQuerry, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM categories";
        db.query(fatchquerry, (err, result) => {
          return response.status(200).send(result);
        });
      }
    });
  },

  editCategories: async (request, response) => {
    let idParams = request.params.id;
    let dataUpdate = request.body;
    console.log(dataUpdate);

    let fetchQuerry = `UPDATE categories set name = ${dataUpdate}  where id = ${db.escape(
      idParams
    )}`;
    db.query(fetchQuerry, (err, result) => {
      if (err) response.status(500).send(err);
      response.status(200).send(result);
    });
  },
};
