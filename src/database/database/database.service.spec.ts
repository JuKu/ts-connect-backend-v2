import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "./database.service";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/test-utils/MongooseTestModule";
import {ConfigService} from "@nestjs/config";
import {DatabaseModule} from "../database.module";

describe("DatabaseService", () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigService, DatabaseModule/* , rootMongooseTestModule()*/],
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
