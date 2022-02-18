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
   * @param user
   */
  async login(user: any) {
    /* const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };*/
  }
}
