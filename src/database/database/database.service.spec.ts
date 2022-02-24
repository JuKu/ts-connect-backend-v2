import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "./database.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DatabaseModule} from "../database.module";
import configuration from "../../../config/configuration";

// jest.setup.js
jest.setTimeout(10000);

describe("DatabaseService", () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    // add code here
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getDbHandle() should be defined", () => {
    expect(service.getDbHandle()).toBeDefined();
  });
});
