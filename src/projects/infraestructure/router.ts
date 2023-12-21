import Express from "express";
import { projectController } from "./dependencies";
import { filesUpload } from "../../shared/infraestructure/multer-middelware";
import {
  validatorHandlerMiddelware,
  isMongoIdValidatorHandler,
} from "../../shared/infraestructure/validator-middelware";
import { createProjectSchema } from "./validator-schema";
import { authHandlerMiddelware } from "./dependencies";
export const projectsRouter = Express.Router();

projectsRouter.post(
  "",
  authHandlerMiddelware.authVerification.bind(authHandlerMiddelware),
  filesUpload.fields([
    { name: "images", maxCount: 4 },
    { name: "video", maxCount: 1 },
  ]),
  validatorHandlerMiddelware(createProjectSchema, "body"),
  projectController.createProject.bind(projectController)
);

projectsRouter.get(
  "",
  projectController.getAllProjects.bind(projectController)
);

projectsRouter.get(
  "/:id",
  isMongoIdValidatorHandler,
  projectController.getProject.bind(projectController)
);

projectsRouter.put(
  "/:id",
  authHandlerMiddelware.authVerification.bind(authHandlerMiddelware),
  isMongoIdValidatorHandler,
  projectController.updateProject.bind(projectController)
);

projectsRouter.put(
  "/videos/:id",
  authHandlerMiddelware.authVerification.bind(authHandlerMiddelware),
  isMongoIdValidatorHandler,
  filesUpload.fields([{ name: "video", maxCount: 1 }]),
  projectController.updateProjectVideo.bind(projectController)
);

projectsRouter.put(
  "/images/:id",
  authHandlerMiddelware.authVerification.bind(authHandlerMiddelware),
  isMongoIdValidatorHandler,
  filesUpload.fields([{ name: "images", maxCount: 1 }]),
  projectController.updateProjectImages.bind(projectController)
);

projectsRouter.delete(
  "/:id",
  authHandlerMiddelware.authVerification.bind(authHandlerMiddelware),
  isMongoIdValidatorHandler,
  projectController.removeProject.bind(projectController)
);
