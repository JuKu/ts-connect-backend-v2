import {Test, TestingModule} from "@nestjs/testing";
import {LocalStrategy} from "./local.strategy";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user/user.service";
import {AuthService} from "../auth.service";

describe("LocalStrategyService", () => {
  let service: LocalStrategy;

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
      providers: [UserService, AuthService, LocalStrategy],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
