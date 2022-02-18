import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/mongoose";
import {Connection} from "mongoose";

@Injectable()
/**
 * This service is responsible for return the current MongoDB
 * connection.
 *
 * See also: https://github.com/mguay22/nestjs-mongo/blob/e2e-finish/src/database/database.service.ts
 */
export class DatabaseService {
  /**
   * The constructor.
   *
   * @constructor
   *
   * @param {Connection} mongodb database connection
   */
  constructor(@InjectConnection() private readonly connection: Connection) {}

  /**
   * Get the MongoDB database connection.
   *
   * @return {Connection} mongodb connection
   */
  getDbHandle(): Connection {
    return this.connection;
  }
}
