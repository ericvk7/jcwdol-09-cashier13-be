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
};
