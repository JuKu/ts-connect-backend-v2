import {Test, TestingModule} from "@nestjs/testing";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user/user.service";
import {AuthService} from "../auth.service";
import configuration from "../../../config/configuration";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../../user/user-schema";

describe("JwtStrategyService", () => {
  let service: JwtStrategy;

  beforeEach(async () => {
    const config = {
      "auth.jwt.secret": "test-secret",
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          // When you want to use ConfigModule in other modules,
          // you'll need to import it.
          // see also: https://docs.nestjs.com/techniques/configuration
          load: [configuration],
          isGlobal: true,
        }),
        JwtModule.registerAsync({
          imports: [],
          useFactory: async () => {
            const options: JwtModuleOptions = {
              secret: "test-secret",
              signOptions: {
                expiresIn: "3h",
              },
            };
            return options;
          },
          inject: [],
        }),
      ],
      providers: [UserService, AuthService, JwtStrategy, ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        }],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("validate() should return a valide object", async () => {
    const payload = {
      sub: 1,
      username: "admin",
    };

    const expectedValue = {
      userId: 1,
      username: "admin",
    };

    expect(await service.validate(payload)).toBeDefined();
    expect(await service.validate(payload)).toEqual(expectedValue);
  });
});
