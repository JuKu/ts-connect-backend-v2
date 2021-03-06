import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "./database.service";
import {ConfigService} from "@nestjs/config";
import {DatabaseModule} from "../database.module";
import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
import {MongooseModule} from "@nestjs/mongoose";

// jest.setup.js
jest.setTimeout(60000);

describe("DatabaseService", () => {
  let service: DatabaseService;
  // let mongod: MongoMemoryServer;
  let module: TestingModule;

  beforeEach(async () => {
    // jest.setTimeout(10000);
    // mongod = new MongoMemoryServer({binary: {version: "4.2.6"}});
    // await mongod.ensureInstance();

    module = await Test.createTestingModule({
      imports: [ConfigService, /* DatabaseModule*/
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: global.__MONGO_URI__, // mongod.getUri(),
          }),
        })],
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(async () => {
    await module.close();
    await mongoose.disconnect();
    // await mongod.stop();
    // mongod = undefined;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getDbHandle() should be defined", () => {
    expect(service.getDbHandle()).toBeDefined();
  });
});
