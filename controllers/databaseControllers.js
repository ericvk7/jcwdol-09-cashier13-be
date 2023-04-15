const { db, querry } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");

module.exports = {
  fetchProduct: async (request, response) => {
    let fetchQuerry = `SELECT * FROM db_jcwdol_mini_cashier_13.products`;
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchCategory: async (request, response) => {
    let fetchQuerry = `SELECT * FROM db_jcwdol_mini_cashier_13.categories`;
    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  addProduct: async (request, response) => {
    const { name, price, description, id_users, id_categories } = request.body;
    let fetchQuerry = `INSERT INTO products VALUES (null, ${db.escape(
      name
    )}, ${db.escape(price)}, ${db.escape(description)}, ${db.escape(
      id_users
    )}, ${db.escape(id_categories)})`;
    db.query(fetchQuerry, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM products";
        db.query(fatchquerry, (err, result) => {
          return response.status(200).send(result);
        });
      }
    });
  },

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
};
