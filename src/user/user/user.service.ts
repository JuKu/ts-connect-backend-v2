import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user-schema";
import {Model} from "mongoose";
import {randomUUID} from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

@Injectable()
/**
 * This service is responsible for managing the users,
 * e.q. get and create users.
 *
 * @author Justin Kuenzel
 */
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);

  /**
   * The constructor.
   *
   * @param {Model<UserDocument>} userModel the user model
   */
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.init();
  }

  /**
   * This method initialized a local array with some example users.
   * This should be removed later.
   *
   * @async
   */
  async init() {
    //
  }

  /**
   * get the user object by username.
   * The passwort expects, that "null" (undefined) is returned,
   * if the user does not exists.
   *
   * @param {string} username the username of the user
   * @return {Promise<User> | undefined} the user object or undefined
   */
  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({username: username}).exec();
    // .users.find((user) => user.username === username);
  }

  /**
   * Count the registered users.
   *
   * @async
   * @return {Promise<number>} the promise with the user count
   */
  async countUsers(): Promise<number> {
    return this.userModel.count().exec();
  }

  /**
   * Create the admin user, if no other user exists.
   *
   * @return {void}
   */
  async onModuleInit(): Promise<void> {
    if ((await this.userModel.count().exec()) === 0) {
      this.logger.log("create new admin user 'admin' with password 'admin', " +
        "because no other user exists");

      // generate random salt
      const salt = await bcrypt.hash(randomUUID(), 10);

      const createdUser = new this.userModel({
        username: "admin",
        password: await bcrypt.hash("admin" + salt, 10),
        salt: salt,
        email: "admin@example.com",
        preName: "Admin",
        lastName: "Admin",
        country: "germany",
        gender: 0,
        globalRoles: ["super-admin", "developer"],
        globalPermissions: ["super-admin"],
      });
      await createdUser.save();
    } else {
      this.logger.log("don't create admin user, because users already exists");
    }
  }
}
