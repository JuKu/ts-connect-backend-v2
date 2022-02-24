import {Test, TestingModule} from "@nestjs/testing";
import {LocalStrategy} from "./local.strategy";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user/user.service";
import {AuthService} from "../auth.service";
import {UnauthorizedException} from "@nestjs/common";
import * as util from "util";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../../user/user-schema";

describe("LocalStrategyService", () => {
  let service: LocalStrategy;
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
      providers: [UserService, AuthService, LocalStrategy,
        {
          provide: getModelToken(User.name),
          useValue: {},
        }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("validate() should throw an UnauthorizedException " +
    "if credentials are wrong", async () => {
    const result = null;
    jest.spyOn(authService, "validateUser").mockImplementation(
        (username: string, password: string) => result);

    await expect(async () => {
      await service.validate("test", "test");
    })
        .rejects
    // also .toBeInstanceOf is possible, see also: https://stackoverflow.com/questions/47144187/can-you-write-async-tests-that-expect-tothrow
        .toThrowError(new UnauthorizedException());
  });

  it("validate() should return an user object, if credentials are right",
      async () => {
        const result: Promise<any> = new Promise<any>(((resolve, reject) => {
          resolve({
            "userid": 1,
            "username": "admin",
          });
        }));

        jest.spyOn(authService, "validateUser").mockImplementation(
            (username: string, password: string) => result);

        const res = await service.validate("admin", "admin");
        expect(res).toBeDefined();
        expect(res.userid).toBe(1);
        expect(res.username).toBe("admin");
      });
});
