import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {AppModule} from "./../src/app.module";
// eslint-disable-next-line max-len
import {closeInMongodConnection, rootMongooseTestModule} from "./test-utils/MongooseTestModule";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    // const mongod = new MongoMemoryServer();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
        .get("/")
        .expect(200)
        .expect("This is the public API of the ts-connect-app.");
  });

  it("/api/version (GET)", () => {
    return request(app.getHttpServer())
        .get("/api/version")
        .expect(200)
        .expect({
          "version": "0.0.1",
        });
  });
});
