const {
  registerUser,
  loginUser,
  checkUserSession,
} = require("../controllers/auth");

const express = require("express");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/sessionauth").post(checkUserSession);

module.exports = router;
