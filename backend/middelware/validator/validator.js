// this middleware create for check req.body value and zod's authValidor value and after call authController call
// await schema.parseAsync(req.body) is the line where you use to zod validate the request body data against the define schema.
// Given zod schema, you can call its `.parseAsync`for async method to check `data` is valid. if it is a value is returned with full type information! otherwise, an error is thrown.

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // res.status(400).json({ msg: err.errors[0].message });
    const status = 400;
    const message = err.errors[0].message || "Validation error";
    const extraDetailes = "Error from backend";
    const error = {
      status,
      message,
      extraDetailes,
    };
    next(error);
  }
};

module.exports = validate;
