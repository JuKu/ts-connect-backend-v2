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
  // eslint-disable-next-line require-jsdoc
  public async login(): Promise<any> {
    this.logger.log("someone tries to login");
    return {};
  }

  @Post("password-forgotten")
  /**
   * password forgotten function.
   * Requires the username or email to resend a password link to the mail.
   *
   * @return {Promise} json object
   */
  // eslint-disable-next-line require-jsdoc
  public async passwordForgotten(): Promise<any> {
    return {};
  }
}
