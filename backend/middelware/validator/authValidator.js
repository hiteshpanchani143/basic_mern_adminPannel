const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(3, { message: "Username must be at least 3 character." })
    .max(255, { message: "Username must not be more than 255 character." }),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be at least 3 character." })
    .max(255, { message: "Email must not be more than 255 character." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(6, { message: "Password must be at least 6 character." })
    .max(255, { message: "Password must not be more than 255 character." }),
  phone: z
    .string({ required_error: "Phone is required." })
    .trim()
    .min(10, { message: "Phone must be at least 10 character." })
    .max(20, { message: "Phone must not be more than 20 character." }),
});
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be at least 3 character." })
    .max(255, { message: "Email must not be more than 255 character." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(6, { message: "Password must be at least 6 character." })
    .max(255, { message: "Password must not be more than 255 character." }),
});
module.exports = { signupSchema, loginSchema };
