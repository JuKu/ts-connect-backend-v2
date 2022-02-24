import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user-schema";
import {Model} from "mongoose";
import {randomUUID} from "crypto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcryptjs");

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  DIVERSE = 2
}

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

  public async createUser({username, password, email = "test@example.com",
    preName = "Unknown", lastName = "Unknown",
    country = "germany", gender = Gender.MALE,
    globalRoles, globalPermissions = ["login"], deletable = true}: {
    username: string, password: string,
      email: string, preName: string, lastName: string,
      country: string, gender: Gender,
      globalRoles: Array<string>, globalPermissions: Array<string>,
    deletable: boolean,
  },
  ): Promise<UserDocument> {
    // generate random salt
    const salt = await bcrypt.hash(randomUUID(), 10);

    const createdUser = new this.userModel({
      username: username,
      password: await bcrypt.hash(password + salt, 10),
      salt: salt,
      email: email,
      preName: preName,
      lastName: lastName,
      country: country,
      gender: gender.valueOf(),
      globalRoles: globalRoles,
      globalPermissions: globalPermissions,
      deletable: deletable,
    });
    return await createdUser.save();
  }

  public async deleteUserById(userId: number): Promise<boolean> {
    // first, check if user is deletable
    const user: UserDocument = await this.userModel.findById(userId).exec();

    if (user && user.deletable) {
      const deleteResult = await this.userModel.deleteOne({_id: userId}).exec();
      return deleteResult.acknowledged;
    } else {
      this.logger.warn("Cannot delete user, user does " +
        "not exists or is not deletable: " + user);
      return false;
    }
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

      await this.createUser({
        username: "admin", password: "admin", email: "admin@example.com",
        preName: "Admin", lastName: "Admin", country: "germany",
        gender: Gender.MALE, globalRoles: [
          "super-admin",
          "developer",
        ], globalPermissions: ["super-admin"],
        deletable: false,
      });
    } else {
      this.logger.log("don't create admin user, because users already exists");
    }
  }
}
