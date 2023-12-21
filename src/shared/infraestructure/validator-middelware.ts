import express from "express";
import Joi from "joi";
import { isMongoId } from "class-validator";

type property = "params" | "body";

export function validatorHandlerMiddelware(
  schema: Joi.Schema,
  property: property
) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      res.status(400).send({ message: error.message });
      return;
    }
    next();
  };
}

export function isMongoIdValidatorHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { id } = req.params;
  if (!id || !isMongoId(id)) {
    throw new Error("Id must be a valid MongoId");
  }

  next();
}

