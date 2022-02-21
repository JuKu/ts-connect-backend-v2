import {Injectable, Logger} from "@nestjs/common";
import {UserService} from "../user/user/user.service";
import bcrypt from "bcryptjs";

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
   * @param {UserService} usersService the user service
   */
  constructor(private usersService: UserService) {}

  /**
   * Try to login the user.
   *
   * @param {string} username the username of the user
   * @param {string} password the password of the user
   * @return {Promise<any>} the return promise
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    this.logger.log("try to login user: " + username);

    // TODO: get salt from user
    const salt = user.salt;

    // check password
    if (user && await bcrypt.compare(password + salt, user.password)) {
      // password is correct
      this.logger.log("password correct for user '" + user.username + "'",
          {"type": "login", "username": username});

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, salt, ...result} = user;
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
}
