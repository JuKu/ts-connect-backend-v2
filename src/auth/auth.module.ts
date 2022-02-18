import {Module} from "@nestjs/common";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          // privateKey: configService.get("JWT_PRIVATE_KEY"),
          // publicKey: configService.get("JWT_PUBLIC_KEY"),
          secret: configService.get("auth.jwt.secret"),
          signOptions: {
            expiresIn: configService.get("auth.jwt.expiresIn"),
          },
          /* signOptions: {
            expiresIn: "3h",
            issuer: "<Your Auth Service here>",
            algorithm: "RS256",
          },*/
        };
        return options;
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService/* , LocalStrategy*/],
  exports: [AuthService],
})
export class AuthModule {}