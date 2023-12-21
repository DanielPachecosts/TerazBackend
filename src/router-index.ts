import Express from "express";
import { userRouter } from "../src/users/infraestructure/user-router";
import { projectsRouter } from "../src/projects/infraestructure/router";

export function routerApi(app: Express.Application) {
  const router = Express.Router();
  app.use("/api/v1", router);
  router.use("/users", userRouter);
  router.use("/projects", projectsRouter);
}
