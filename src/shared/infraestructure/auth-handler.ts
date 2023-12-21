import { NextFunction, Request, Response } from "express";
import { TokenServiceInt } from "../domain/token-types";

export class AuthHandler {
  constructor(private tokenService: TokenServiceInt) {}

  authVerification(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send("Not authorized headers");
      return null;
    }

    const [authType, token] = authorization.split(" ");

    if (authType !== "Bearer") {
      res.status(401).send("Not authorized Auth");
      return;
    }

    try {
      const payload = this.tokenVerification(token);
      
      if (payload) {
        next();
      }
    } catch (error: any) {
      res.status(401).send({ message: "Not valid token", error });
      return;
    }
  }

  tokenVerification(token: string) {
    return this.tokenService.verifyToken(token);
  }
}
