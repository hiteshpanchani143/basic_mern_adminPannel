const express = require("express");
const adminController = require("../controllers/adminControllers");
const router = express.Router();
const authMiddleware = require("../middelware/auth/authMiddleware");

router.get("/user", authMiddleware, adminController.getAllUser);
router.get("/service", authMiddleware, adminController.getAllServices);
router.get("/contact", authMiddleware, adminController.getAllContact);

module.exports = router;
