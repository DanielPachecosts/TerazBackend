export interface payload {
  username: string;
}

export interface AccessToken {
  accessToken: string;
}

export interface TokenServiceInt {
  signToken(payload: payload): string;
  verifyToken(token: string): boolean;
}
