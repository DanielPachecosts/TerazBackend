import express from "express";
import config from "../../config";

export function checkCredentialsMiddelware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { username, password } = req.body;
  if (username !== config.adminUser || password !== config.adminPassword) {
    res.status(400).send({ message: "Bad Request" });
    return;
  }

  next();
}
