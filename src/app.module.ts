import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {UserModule} from "./user/user.module";
import {InfoModule} from "./info/info.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AdminModule} from "./admin/admin.module";
import {ProfileModule} from "./profile/profile.module";
import {StatisticsModule} from "./statistics/statistics.module";
import {ChatModule} from "./chat/chat.module";
import {MessagesModule} from "./messages/messages.module";
import {AuthModule} from "./auth/auth.module";
import configuration from "../config/configuration";
import {ThrottlerModule, ThrottlerModuleOptions} from "@nestjs/throttler";
import {JwtModuleOptions} from "@nestjs/jwt";

@Module({
  imports: [ConfigModule.forRoot({
    // When you want to use ConfigModule in other modules,
    // you'll need to import it.
    // see also: https://docs.nestjs.com/techniques/configuration
    load: [configuration],
    isGlobal: true,
  }), UserModule, InfoModule, AdminModule,
  ProfileModule, StatisticsModule, ChatModule, MessagesModule, AuthModule,
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const options: ThrottlerModuleOptions = {
        ttl: Number.parseInt(configService.get("")),
        limit: Number.parseInt(configService.get("")),
      };
      return options;
    },
    inject: [ConfigService],
  }),/* .forRoot({
    ttl: 60,
    limit: 10,
  }),*/
  ],
  controllers: [AppController],
  providers: [],
})

/**
 * the top-level app module.
 */
export class AppModule {
}
