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
      imports: [ConfigModule.forRoot({
        // When you want to use ConfigModule in other modules,
        // you'll need to import it.
        // see also: https://docs.nestjs.com/techniques/configuration
        load: [configuration],
        isGlobal: true,
      }), DatabaseModule],
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
