import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user-schema";
import {Model} from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

@Injectable()
/**
 * This service is responsible for managing the users,
 * e.q. get and create users.
 *
 * @author Justin Kuenzel
 */
export class UserService {
  // TODO: replace this with mongoose
  private users = [];

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.init();
  }

  async init() {
    this.users = [
      {
        userId: 1,
        username: "admin",
        password: await bcrypt.hash("admin", 10),
        salt: "",
      },
      {
        userId: 2,
        username: "maria",
        password: "guess",
        salt: "",
      },
    ];
  }

  /**
   * get the user object by username.
   * The passwort expects, that "null" (undefined) is returned,
   * if the user does not exists.
   *
   * @param {string} username the username of the user
   * @return {Promise<User> | undefined} the user object or undefined
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
