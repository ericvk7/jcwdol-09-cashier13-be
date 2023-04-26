const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  register: async (req, res) => {
    const { email, password, phone, storeName, username } = req.body;
    // ASYNC AWAIT
    //ambil data dari database yang email = email dari body
    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(200).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let addUserQuery = `INSERT INTO users VALUES (null,
      ${db.escape(username)},
      ${db.escape(email)}, 
      ${db.escape(hashPassword)},
      ${db.escape(phone)}, 
      ${db.escape(storeName)},false)`;
    let addUserResult = await query(addUserQuery);

    let payload = { id: addUserResult.insertId };
    const token = jwt.sign(payload, "joe", { expiresIn: "4h" });

    let mail = {
      from: `Admin <eric.vianto.k7@gmail.com>`,
      to: `${email}`,
      subject: `Verified your account`,
      html: `
            <div>
            <p>Thanks for register, you need to activate your account,</p>
            <a href="http://localhost:3000/user/verification/${token}">Click Here</a>
            <span>to activate</span>
            </div>
            `,
    };
    let response = await nodemailer.sendMail(mail);
    console.log(response);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },

  verification: async (req, res) => {
    try {
      console.log(req.user);
      const id = req.user.id;
      let updateIsActiveQuery = `UPDATE users SET isVerified = true WHERE id_user=${db.escape(
        id
      )}`;
      console.log(updateIsActiveQuery);
      await query(updateIsActiveQuery);
      res.status(200).send({ success: true, message: "Account is verified" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
