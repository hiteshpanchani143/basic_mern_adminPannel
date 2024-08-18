const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middelware/validator/validator");
const {
  signupSchema,
  loginSchema,
} = require("../middelware/validator/authValidator");
const authMiddleware = require("../middelware/auth/authMiddleware");
const router = express.Router();

// first method // we can chaining in this
// router
//   .route("/")
//   .get((req, res) => {
//     res.status(200).send("home get route");
//   })
//   .post((req, res) => {
//     res.status(200).send("home post route");
//   });

// second method for indiviual route

router.get("/", authController.home);

router.post("/register", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/user", authMiddleware, authController.user);

module.exports = router;
