const express = require("express");
const authenticationMiddleware = require("../middleware/auth")
const { login, dashboard } = require("../controllers/jwt");
const router = express.Router();


router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;
