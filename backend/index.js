require("dotenv").config();
const express = require("express");
const app = express();
const AuthRouter = require("./routes/authRoute");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middelware/error/errorMiddleware");

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", AuthRouter);

// Global error handling middleware (should be placed after all routes)
app.use(errorMiddleware);
const PORT = 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
