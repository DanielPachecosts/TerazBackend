import jwt from "jsonwebtoken";
import { TokenServiceInt } from "../domain/token-types";
import { payload } from "../domain/token-types";
import config from "../../config";

class TokenService implements TokenServiceInt {
  signToken(payload: payload): string {
    return jwt.sign(payload, config.secretKey!, { expiresIn: "4h" });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, config.secretKey!);
  }
}

export default new TokenService();
