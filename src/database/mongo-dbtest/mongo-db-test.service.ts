import {Injectable} from "@nestjs/common";
import {MongoMemoryServer} from "mongodb-memory-server";

@Injectable()
export class MongoDbTestService {
  mongod: MongoMemoryServer;

  /**
   * This method is used in e2e tests to setup a mongodb database.
   */
  async createInMemoryInstance(): Promise<string> {
    if (this.mongod !== undefined) {
      console.warn("mongodb in-memory database is already running");
      return this.mongod.getUri();
    }

    this.mongod = await MongoMemoryServer.create();
    const mongoUri = this.mongod.getUri();
    console.info("created mongodb in-memory database: " + mongoUri);

    return mongoUri;
  }

  async stopServer(): Promise<void> {
    await this.mongod.stop();
  }

  getInstance(): MongoMemoryServer {
    return this.mongod;
  }
}
