require("dotenv").config();
const express = require("express");
const app = express();
const AuthRouter = require("./routes/authRoute");
const connectDb = require("./utils/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", AuthRouter);

const PORT = 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
