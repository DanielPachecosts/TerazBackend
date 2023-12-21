import Express from "express";
import { userController } from "../infraestructure/dependencies";
import { checkCredentialsMiddelware } from "./auth-middelware";
import { validatorHandlerMiddelware } from "../../shared/infraestructure/validator-middelware";
import { loginUserSchema } from "./validator-schema";

export const userRouter = Express.Router();

userRouter.post(
  "/login",
  validatorHandlerMiddelware(loginUserSchema, "body"),
  checkCredentialsMiddelware,
  userController.loginUser.bind(userController)
);
