const express = require("express");
const adminController = require("../controllers/adminControllers");
const router = express.Router();
const authMiddleware = require("../middelware/auth/authMiddleware");
const adminMiddleware = require("../middelware/admin/adminMiddleware");

// users route
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

// services route
router.get(
  "/service",
  authMiddleware,
  adminMiddleware,
  adminController.getAllServices
);

// contacts route
router.get(
  "/contact",
  authMiddleware,
  adminMiddleware,
  adminController.getAllContact
);
router.get(
  "/contact/:id",
  authMiddleware,
  adminMiddleware,
  adminController.getSingleContact
);
router.patch(
  "/contact/edit/:id",
  authMiddleware,
  adminMiddleware,
  adminController.getContactAndUpdate
);
router.delete(
  "/contact/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteContact
);
module.exports = router;
