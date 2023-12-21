import Joi from "joi";

const brand = Joi.string();
const description = Joi.string();

const createProjectSchema = Joi.object({
  brand: brand.required(),
  description: description.required(),
});

export { createProjectSchema };
