const errorMiddleware = (err, req, res, next) => {
  console.log("err", err);
  const status = err.status || 500;
  const message = err.message || "Error in backend";
  const extraDetailes = err.extraDetailes || "No additional details available.";
  return res.status(status).json({ message, extraDetailes });
};

module.exports = errorMiddleware;
