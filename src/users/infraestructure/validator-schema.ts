import Joi from "joi";

const username = Joi.string()
  .regex(/^[A-Za-z\s]+$/)
  .min(6);
const password = Joi.string().min(6);

const loginUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
});

export { loginUserSchema };
