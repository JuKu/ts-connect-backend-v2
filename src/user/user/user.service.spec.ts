import {Test, TestingModule} from "@nestjs/testing";
import {Gender, UserService} from "./user.service";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {User, UserDocument, UserSchema} from "../user-schema";
import {MongoMemoryServer} from "mongodb-memory-server";
import {MongoDbTestService}
  from "../../database/mongo-dbtest/mongo-db-test.service";
import {DatabaseModule} from "../../database/database.module";
import {Connection, Model} from "mongoose";
import {DatabaseService} from "../../database/database/database.service";
import {ConfigService} from "@nestjs/config";

describe("UserService", () => {
  let service: UserService;
  let dbConnection: Connection;
  let mongod: MongoMemoryServer;

  beforeEach(async () => {
    if (mongod !== undefined) {
      console.error("mongod instance already exists");
    }

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigService, /* DatabaseModule,*/
        // rootMongooseTestModule(),
        // DatabaseModule,
        // MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      ],
      providers: [UserService,
        // DatabaseService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        }],
    }).compile();

    service = module.get<UserService>(UserService);
    /* mongod = await module.get<MongoDbTestService>(MongoDbTestService)
        .getInstance();

    dbConnection = module
        .get<DatabaseService>(DatabaseService).getDbHandle();

    // start transaction
    await dbConnection.startSession();*/
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
