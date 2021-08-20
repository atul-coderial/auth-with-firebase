//Loading Express Library
const express = require("express");
const router = express.Router();

//Home Controller
const homeController = require("../controllers/home");
router.get("/", homeController.home);
router.get("/profile", homeController.profile);

router.use("/", require("./auth"));

module.exports = router;
