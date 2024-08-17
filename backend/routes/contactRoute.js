const express = require("express");
const contactController = require("../controllers/contactController");
const validate = require("../middelware/validator/validator");
const contactSchema = require("../middelware/validator/contactValidator");
const router = express.Router();

router.post("/contact", validate(contactSchema), contactController);

module.exports = router;
