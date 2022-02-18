import {Injectable} from "@nestjs/common";
import {MongoMemoryServer} from "mongodb-memory-server";
import * as mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var monged: MongoMemoryServer;
}

@Injectable()
/**
 * This service is responsible for providing a mongodb in-memory database.
 *
 * @author Justin Kuenzel
 */
export class MongoDbTestService {
  /**
   * This method is used in e2e tests to setup a mongodb database.
   *
   * @async
   * @return {Promise<string>} mongodb uri
   */
  async createInMemoryInstance(): Promise<string> {
    if (global.mongod !== undefined) {
      console.warn("mongodb in-memory database is already running");
      return global.mongod.getUri() + "test";
    }

    global.mongod = await MongoMemoryServer.create({
      instance: {
        auth: false,
        dbName: "test",
        ip: "::,0.0.0.0",
      },
    });
    const mongoUri = global.mongod.getUri() + "test";
    console.info("created mongodb in-memory database: " + mongoUri);

    // check connection
    await mongoose.connect(mongoUri);
    console.info("check mongodb connection: mongoose connected.");

    return mongoUri;
  }

  /**
   * Stop the mongodb in-memory database.
   */
  async stopServer(): Promise<void> {
    await global.mongod.stop();
    global.mongod = undefined;
  }

  /**
   * Get the current MongoDB in-memory instance.
   *
   * @return {Promise<MongoMemoryServer>} mongo in-memory server
   */
  async getInstance(): Promise<MongoMemoryServer> {
    return global.mongod;
  }
}
