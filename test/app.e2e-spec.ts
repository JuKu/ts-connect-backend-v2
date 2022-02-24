import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication} from "@nestjs/common";
import * as request from "supertest";
import {AppModule} from "./../src/app.module";
import {Connection} from "mongoose";
import {DatabaseService} from "../src/database/database/database.service";
import {MongoMemoryServer} from "mongodb-memory-server";
import {MongoDbTestService}
  from "../src/database/mongo-dbtest/mongo-db-test.service";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let mongod: MongoMemoryServer;

  // replace "Each" with "All"
  beforeAll(async () => {
    // const mongod = new MongoMemoryServer();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    mongod = await moduleFixture.get<MongoDbTestService>(MongoDbTestService)
        .getInstance();

    // get MongoDB connection
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dbConnection = moduleFixture
        .get<DatabaseService>(DatabaseService).getDbHandle();
  });

  afterAll(async () => {
    // await closeInMongodConnection();
    mongod.stop().then();
    await app.close();
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

  it("/api/auth/user-info should return a 401, if the user is not logged in",
      async () => {
        // the logged out user should get a http status code 401
        return request(app.getHttpServer())
            .get("/api/auth/user-info")
            .expect(401);
      });

  it("/api/auth/user-info with wrong JWT token should return a 401 status code",
      async () => {
        const token = "test";

        return request(app.getHttpServer())
            .get("/api/auth/user-info")
            .set("Authorization", "Bearer " + token)
            .expect(401);
      });

  it("/api/login should get a JWT then successfully make a call",
      async () => {
        const loginReq = await request(app.getHttpServer())
            .post("/api/login")
            .send({username: "admin", password: "admin"})
            .expect(201);

        const token = loginReq.body.access_token;
        return request(app.getHttpServer())
            .get("/api/auth/user-info")
            .set("Authorization", "Bearer " + token)
            .expect(200)
            .expect((res) => {
              res.body.username = "admin";
            });
        // .expect({userId: 1, username: "admin"});
      });
});
