const express = require("express");
const app = express();
const AuthRouter = require("./routes/authRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", AuthRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
