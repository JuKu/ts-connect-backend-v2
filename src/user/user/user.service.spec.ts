import {Test, TestingModule} from "@nestjs/testing";
import {Gender, UserService} from "./user.service";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {User, UserDocument, UserSchema} from "../user-schema";
import {MongoMemoryServer} from "mongodb-memory-server";
import {Connection} from "mongoose";
import {ConfigService} from "@nestjs/config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {MongoClient} = require("mongodb");
import mockingoose from "mockingoose";
import * as mongoose from "mongoose";

describe("UserService", () => {
  let service: UserService;
  let dbConnection: Connection;
  // let mongod: MongoMemoryServer;
  let module: TestingModule;

  let connection;
  let db;

  beforeAll(async () => {
    /* if (global.__MONGO_URI__ === undefined) {
      console.error("MongoDB server is not started");
      process.exit(1);
    } */

    console.info("MongoDB Url: " + global.__MONGO_URI__);

    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    /* if (mongod !== undefined) {
      console.error("mongod instance already exists");
    } */

    // jest.setTimeout(10000);
    // mongod = new MongoMemoryServer({binary: {version: "4.2.6"}});
    // await mongod.ensureInstance();

    module = await Test.createTestingModule({
      imports: [
        // eslint-disable-next-line max-len
        ConfigService, MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            // see also: https://jestjs.io/docs/mongodb
            uri: /* mongod.getUri() */global.__MONGO_URI__,
          }),
        }),
      ],
      providers: [UserService,
        // DatabaseService,
        /* {
          provide: getModelToken(User.name),
          useValue: mockRepository,
        }*/],
    }).compile();

    service = module.get<UserService>(UserService);
    /* mongod = await module.get<MongoDbTestService>(MongoDbTestService)
        .getInstance();

    dbConnection = module
        .get<DatabaseService>(DatabaseService).getDbHandle();

    // start transaction
    await dbConnection.startSession();*/
  });

  afterEach(async () => {
    await module.close();
    await mongoose.disconnect();
    // await mongod.stop();
    // mongod = undefined;
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be able to create and delete users", async () => {
    const user: UserDocument = await service.createUser({
      username: "test",
      password: "test1",
      email: "test@example.com",
      preName: "Test",
      lastName: "Tester",
      country: "germany",
      gender: Gender.MALE,
      globalRoles: ["super-admin", "developer", "test-role"],
      globalPermissions: ["super-admin"],
      deletable: true,
    });

    // first, create user
    expect(user).toBeDefined();
    expect(user.username).toEqual("test");
    expect(user.password).not.toEqual("test1");
    expect(user.email).toEqual("test@example.com");
    expect(user.preName).toEqual("Test");
    expect(user.lastName).toEqual("Tester");
    expect(user.globalRoles).toContain("super-admin");
    expect(user.globalRoles).toContain("developer");
    expect(user.globalRoles).toContain("test-role");

    const userId: string = user._id;

    // check, if user exists
    expect(await service.findOne("test1")).toBeNull();
    expect(await service.findOne("test")).toBeDefined();
    expect(await service.findOne("test")).not.toBeNull();

    expect(await service.countUsers()).toEqual(1);

    // delete user

    // not existent user id
    // eslint-disable-next-line max-len
    expect(await service.deleteUserById("41224d776a326fb40f000001")).toBeFalsy();
    // eslint-disable-next-line max-len
    expect(await service.deleteUserById("41224d776a326fb40f000001")).toBe(false);

    const res = await service.deleteUserById(user._id);
    expect(res).toBeTruthy();
    expect(res).toBe(true);
  });

  it("should create the admin user on startup, if no other user exists",
      async () => {
        expect(await service.countUsers()).toEqual(0);

        // execute the initialization method
        await service.onModuleInit();

        // the admin user should be created
        expect(await service.countUsers()).toEqual(1);
        expect(await service.findOne("admin")).not.toBeNull();

        // execute the initialization method again
        await service.onModuleInit();

        // no other user should be created
        expect(await service.countUsers()).toEqual(1);
      });
});
