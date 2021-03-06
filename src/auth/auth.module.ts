import {Module} from "@nestjs/common";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from "./auth/auth.controller";
import {LocalStrategy} from "./local-strategy/local.strategy";
import {JwtStrategy} from "./jwt-strategy/jwt.strategy";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./jwt-auth.guard";

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
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthController, LocalStrategy, JwtStrategy,
    // This auth guard is registered public,
    // this means all the endpoints are protected by default
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
/**
 * This module is responsible for the authentication of the user.
 *
 * @author Justin Kuenzel
 */
export class AuthModule {}
