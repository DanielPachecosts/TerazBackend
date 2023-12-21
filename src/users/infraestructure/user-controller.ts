import { Request, Response } from "express";
import { Login } from "../application/login";

export class UserController {
  constructor(private readonly login: Login) {}

  async loginUser(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const accessToken = await this.login.run(username);
      res.status(200).send({ accessToken });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}
