import {Test, TestingModule} from "@nestjs/testing";
import {UserService} from "./user.service";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../user-schema";

describe("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    const userModel = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
