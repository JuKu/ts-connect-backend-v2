import {Injectable, Logger} from "@nestjs/common";
import {UserService} from "../user/user/user.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");
import {JwtService} from "@nestjs/jwt";

@Injectable()
/**
 * This service is responsible for authentication.
 *
 * @author Justin Kuenzel
 */
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  /**
   * The constructor.
   *
   * @param {UserService} userService the user service
   * @param {JwtService} jwtService the json-web-token
   * service provided by passport
   */
  constructor(private userService: UserService,
              private jwtService: JwtService) {}

  /**
   * Try to login the user.
   * If the credentials are wrong null is returned
   *
   * @param {string} username the username of the user
   * @param {string} password the password of the user
   * @return {Promise<any>} the return promise or null, if credentials are wrong
   */
  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    this.logger.log("try to login user: " + username);

    // check password
    if (user && await bcrypt.compare(password + user.salt, user.password)) {
      // password is correct
      this.logger.log("password correct for user '" + user.username + "'",
          {"type": "login", "username": username});

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const {password, salt, ...result} = user;
      const result = {
        userId: user._id,
        username: user.username,
      };
      return result;
    } else {
      // password is wrong
      this.logger.log("login failed for user '" + user.username + "'," +
        " because password is not correct",
      {"type": "login", "username": username});
    }

    // nest passport library expects, that the method returns null,
    // if the credentials was wrong.
    return null;
  }

  /**
   * This method is called from passport.
   *
   * @param {any} user the user object which is returned from validate()
   * @return {Promise<any>} result object, returned as result to user
   */
  public async login(user: any): Promise<any> {
    const payload = {username: user.username, sub: user.userId};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
