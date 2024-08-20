const express = require("express");
const services = require("../controllers/serviceController");
const router = express.Router();

router.get("/services", services.getServices);

module.exports = router;
