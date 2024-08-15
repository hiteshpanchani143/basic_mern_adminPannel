const express = require("express");
const authController = require("../controllers/authController");

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

router.get("/register", authController.register);

module.exports = router;
