import {Test, TestingModule} from "@nestjs/testing";
import {Gender, UserService} from "./user.service";
import {getModelToken, MongooseModule} from "@nestjs/mongoose";
import {User, UserDocument, UserSchema} from "../user-schema";
import {closeInMongodConnection, rootMongooseTestModule}
  from "../../../test/test-utils/MongooseTestModule";

describe("UserService", () => {
  let service: UserService;
  // let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      ],
      providers: [UserService,
        /* {
          provide: getModelToken(User.name),
          useValue: Model,
        }*/],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be able to create and delete users", async () => {
    /* const user1 = new User();
    const userID = "12345";
    const spy = jest
        .spyOn(mockUserModel, "findById") // <- spy on what you want
        .mockResolvedValue(user1 as UserDocument); */

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

  afterEach(async () => {
    await closeInMongodConnection();
  });
});
