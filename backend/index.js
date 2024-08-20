require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const AuthRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const serviceRoute = require("./routes/serviceRoute");
const adminRoute = require("./routes/adminRoute");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middelware/error/errorMiddleware");

// Body parsing middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/form", contactRoute);
app.use("/api/v1/data", serviceRoute);
app.use("/api/v1/admin", adminRoute);

// Global error handling middleware (should be placed after all routes)
app.use(errorMiddleware);
const PORT = 8080;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
