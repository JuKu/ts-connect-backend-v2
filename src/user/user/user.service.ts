import {Injectable} from "@nestjs/common";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
/**
 * This service is responsible for managing the users,
 * e.q. get and create users.
 *
 * @author Justin Kuenzel
 */
export class UserService {
  // TODO: replace this with mongoose
  private readonly users = [
    {
      userId: 1,
      username: "john",
      password: "changeme",
      salt: "",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
      salt: "",
    },
  ];

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
