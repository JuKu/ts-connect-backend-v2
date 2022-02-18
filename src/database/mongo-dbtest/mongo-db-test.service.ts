import {Injectable} from "@nestjs/common";
import {MongoMemoryServer} from "mongodb-memory-server";
import * as mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var monged: MongoMemoryServer;
}

@Injectable()
export class MongoDbTestService {
  /**
   * This method is used in e2e tests to setup a mongodb database.
   */
  async createInMemoryInstance(): Promise<string> {
    if (global.mongod !== undefined) {
      console.warn("mongodb in-memory database is already running");
      return global.mongod.getUri();
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
    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(mongoUri/* , mongooseOpts*/);
    console.info("check mongodb connection: mongoose connected.");

    return mongoUri;
  }

  async stopServer(): Promise<void> {
    await global.mongod.stop();
  }

  async getInstance(): Promise<MongoMemoryServer> {
    return global.mongod;
  }
}
