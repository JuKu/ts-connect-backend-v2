import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "./auth.controller";
import {AuthService} from "../auth.service";
import {UserService} from "../../user/user/user.service";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {promisify} from "util";

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
      providers: [UserService, AuthService],
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
});
