import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "./database.service";
import {ConfigService} from "@nestjs/config";
import {DatabaseModule} from "../database.module";
import mongoose from "mongoose";

// jest.setup.js
jest.setTimeout(10000);

describe("DatabaseService", () => {
  let service: DatabaseService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigService, DatabaseModule],
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(async () => {
    await module.close();
    await mongoose.disconnect();
    // await mongod.stop();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getDbHandle() should be defined", () => {
    expect(service.getDbHandle()).toBeDefined();
  });
});
