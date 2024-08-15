const express = require("express");

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
router.get("/register", (req, res) => {
  res.send("hello router");
});

module.exports = router;
