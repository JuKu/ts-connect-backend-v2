import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "./auth.controller";
import {AuthService} from "../auth.service";
import {UserService} from "../../user/user/user.service";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {promisify} from "util";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../../user/user-schema";

describe("AuthController", () => {
  let controller: AuthController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async () => {
            const options: JwtModuleOptions = {
              secret: "test-secret",
              signOptions: {
                expiresIn: "3h",
              },
            };
            return options;
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [UserService, AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        }],
    }).compile();

    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);

    const result: Promise<any> = new Promise<any>(((resolve, reject) => {
      resolve({
        access_token: "test",
      });
    }));
    jest.spyOn(authService, "login").mockImplementation((user: any) => result);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login() should be defined", async () => {
    const req = jest.mock; // jest.createMockFromModule();
    expect(controller.login(req)).toBeDefined();
  });

  it("passwordForgotten() should be defined", async () => {
    expect(controller.passwordForgotten()).toBeDefined();
  });

  it("getProfile() should return a user information", async () => {
    const req = {
      user: {
        userId: 1,
        username: "test",
      },
    };
    expect(controller.getProfile(req)).toBeDefined();
    expect(controller.getProfile(req).userId).toEqual(1);
    expect(controller.getProfile(req).username).toEqual("test");
  });
});
