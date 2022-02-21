import {Controller, Get, Logger, Post, Request, UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "../local-auth.guard";
import {AuthService} from "../auth.service";
import {JwtAuthGuard} from "../jwt-auth.guard";

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
   * @param {AuthService} authService the authentication service instance
   * @return {void}
   */
  constructor(private authService: AuthService) {
    // add code here
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  /**
   * try to login the user.
   *
   * @async
   * @param {() => ParameterDecorator} the http request
   * @return {any} the user object
   */
  // eslint-disable-next-line require-jsdoc
  async login(@Request() req) {
    return this.authService.login(req.user);
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

  @UseGuards(JwtAuthGuard)
  @Get("auth/user-info")
  getProfile(@Request() req) {
    return req.user;
  }
}
