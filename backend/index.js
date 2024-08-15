const express = require("express");
const app = express();

const AuthRouter = require("./routes/authRoute");

app.get("/", (req, res) => {
  res.status(200).send("welcome to Home page");
});

app.use("/app/v1/auth/", AuthRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
