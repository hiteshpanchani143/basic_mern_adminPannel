const { z } = require("zod");

const contactSchema = z.object({
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
  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(50, { message: "Message must be at least 50 character." })
    .max(1055, { message: "Message must not be more than 1055 character." }),
});

module.exports = contactSchema;
