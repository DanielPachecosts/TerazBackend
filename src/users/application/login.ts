import { TokenServiceInt, payload } from "../../shared/domain/token-types";

export class Login {
  constructor(private tokenService: TokenServiceInt) {}

  run(username: string) {
    const payload: payload = {
      username: username,
    };

    const accessToken = this.tokenService.signToken(payload);
    return accessToken;
  }
}
