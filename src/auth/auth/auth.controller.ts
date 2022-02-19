import {Controller, Logger, Post} from "@nestjs/common";

@Controller("/api")
/**
 * The AuthController is responsible for authentication.
 *
 * @author Justin Kuenzel
 */
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  /**
   * The constructor.
   *
   * @return {void}
   */
  constructor() {
    // add code here
  }

  @Post("login")
  /**
   * try to login the user.
   *
   * @return {Promise} json object
   */
  public async login(): Promise<any> {
    return {};
  }

  @Post("password-forgotten")
  /**
   * password forgotten function.
   * Requires the username or email to resend a password link to the mail.
   *
   * @return {Promise} json object
   */
  public async passwordForgotten(): Promise<any> {
    return {};
  }
}
