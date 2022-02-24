import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user/user.service";
import {JwtModule, JwtModuleOptions, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getModelToken} from "@nestjs/mongoose";
import {User} from "../user/user-schema";

describe("AuthService", () => {
  let service: AuthService;

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
      providers: [AuthService,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {},
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
