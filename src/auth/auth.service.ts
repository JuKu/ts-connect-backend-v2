import {Injectable} from "@nestjs/common";

@Injectable()
/**
 * This service is responsible for authentication.
 *
 * @author Justin Kuenzel
 */
export class AuthService {
  /**
   * Try to login the user.
   *
   * @param {any} user user
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,require-jsdoc
  async login(user: any) {
    /* const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };*/
  }
}
