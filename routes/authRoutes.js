const express = require("express");
const { authController } = require("../controllers");
const { verifyToken, checkRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", authController.register);
router.post("/verification", verifyToken, authController.verification);

module.exports = router;
