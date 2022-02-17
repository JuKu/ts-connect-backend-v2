import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {AppModule} from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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
