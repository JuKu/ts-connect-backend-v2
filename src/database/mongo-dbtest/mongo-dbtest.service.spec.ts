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

  it("should not create a mongodb instance twice", async () => {
    const dbInstance = await service.createInMemoryInstance();
    expect(dbInstance).toBeDefined();
    const dbInstance1 = await service.createInMemoryInstance();
    expect(await service.createInMemoryInstance()).toBeDefined();

    expect(dbInstance).toBe(dbInstance1);

    expect((await service.getInstance()).getUri() + "test").toBe(dbInstance);

    await service.stopServer();
  });
});
