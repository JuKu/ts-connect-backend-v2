import {Test, TestingModule} from "@nestjs/testing";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user/user.service";
import {AuthService} from "../auth.service";
import configuration from "../../../config/configuration";

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
      providers: [UserService, AuthService, JwtStrategy, ConfigService],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});