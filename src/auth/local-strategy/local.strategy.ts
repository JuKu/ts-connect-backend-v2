import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";

@Injectable()
/**
 * The local passport strategy.
 */
export class LocalStrategy extends PassportStrategy(Strategy) {
  // see also: https://docs.nestjs.com/security/authentication#authentication

  /**
   * The constructor.
   *
   * @param {AuthService} authService the auth service instance
   */
  constructor(private authService: AuthService) {
    // the passport-local strategy by default expects properties
    // called username and password in the request body
    super();
  }

  /**
   * This validate method is called from Nest passport library automatically.
   * See also: https://docs.nestjs.com/security/authentication#authentication
   *
   * @param {string} username the username of the user
   * @param {string} password the password of the user
   * @return {Promise<any>} the promise
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    // if the returned user object is undefined, the credentials was wrong
    if (!user) {
      throw new UnauthorizedException();
    }

    // if the credentials was correct, return the correct user object
    return user;
  }
}
