const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/adminController");

router.post("/login", login);
// Remove or comment out the public registration route:
// router.post('/register', adminController.registerAdmin);

module.exports = router;
