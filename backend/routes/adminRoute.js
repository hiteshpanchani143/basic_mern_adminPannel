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
  "/user/:id",
  authMiddleware,
  adminMiddleware,
  adminController.getSingleUser
);
router.patch(
  "/user/edit/:id",
  authMiddleware,
  adminMiddleware,
  adminController.getUserAndUpdate
);
router.delete(
  "/user/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUser
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
