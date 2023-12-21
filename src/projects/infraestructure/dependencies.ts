import { Create } from "../application/create";
import { GetAll } from "../application/get-all";
import { Get } from "../application/get";
import { Update } from "../application/update";
import { Remove } from "../application/remove";
import { ProjectsMongoRepository } from "../infraestructure/mongo-repo";
import { ProjectController } from "../infraestructure/controller";
import { UpdateImage } from "../application/update-image";
import { AuthHandler } from "../../shared/infraestructure/auth-handler";
import TokenService from "../../shared/infraestructure/token-service";

const projectsMongoRepository = new ProjectsMongoRepository();
const authHandlerMiddelware = new AuthHandler(TokenService);

const create = new Create(projectsMongoRepository);
const getAll = new GetAll(projectsMongoRepository);
const get = new Get(projectsMongoRepository);
const update = new Update(projectsMongoRepository);
const remove = new Remove(projectsMongoRepository);
const updateImage = new UpdateImage(projectsMongoRepository);

const projectController = new ProjectController(
  create,
  getAll,
  get,
  update,
  remove,
  updateImage
);

export { projectController, authHandlerMiddelware };
