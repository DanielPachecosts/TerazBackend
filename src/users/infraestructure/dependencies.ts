import TokenService from "../../shared/infraestructure/token-service";
import { Login } from "../application/login";
import { UserController } from "../infraestructure/user-controller";

const login = new Login(TokenService);
const userController = new UserController(login);

export { userController };
