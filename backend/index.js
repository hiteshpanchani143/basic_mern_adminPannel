const express = require("express");
const app = express();

const AuthRouter = require("./routes/authRoute");

app.use("/app/v1/auth/", AuthRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server is running at port : ${PORT}`);
});
