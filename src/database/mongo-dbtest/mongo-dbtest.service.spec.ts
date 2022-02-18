import {Test, TestingModule} from "@nestjs/testing";
import {MongoDbTestService} from "./mongo-db-test.service";

describe("MongoDbTestService", () => {
  let service: MongoDbTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [MongoDbTestService],
    }).compile();

    service = module.get<MongoDbTestService>(MongoDbTestService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
