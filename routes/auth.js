//Loading Express Library
const express = require("express");
const router = express.Router();

//auth controller
const authController = require("../controllers/auth");

router.get("/login", authController.login);
router.get("/signup", authController.create);
router.post("/sessionLogin", authController.loginSession);
router.get("/sessionLogout", authController.sessionLogout);

module.exports = router;
