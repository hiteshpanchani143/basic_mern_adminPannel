const express = require("express");
const adminController = require("../controllers/adminControllers");
const router = express.Router();
const authMiddleware = require("../middelware/auth/authMiddleware");
const adminMiddleware = require("../middelware/admin/adminMiddleware");

router.get(
  "/user",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUser
);
router.get(
  "/service",
  authMiddleware,
  adminMiddleware,
  adminController.getAllServices
);
router.get(
  "/contact",
  authMiddleware,
  adminMiddleware,
  adminController.getAllContact
);

module.exports = router;
