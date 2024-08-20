const express = require("express");
const {
  getAllUser,
  getAllServices,
  getAllContact,
} = require("../controllers/adminControllers");
const router = express.Router();

router.get("/user", getAllUser);
router.get("/service", getAllServices);
router.get("/contact", getAllContact);

module.exports = router;
