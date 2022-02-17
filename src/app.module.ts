import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {UserModule} from "./user/user.module";
import {InfoModule} from "./info/info.module";
import {ConfigModule} from "@nestjs/config";
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import configuration from "../config/configuration";

@Module({
  imports: [ConfigModule.forRoot({
    // When you want to use ConfigModule in other modules,
    // you'll need to import it.
    // see also: https://docs.nestjs.com/techniques/configuration
    load: [configuration],
    isGlobal: true,
  }), UserModule, InfoModule, AdminModule, ProfileModule, StatisticsModule, ChatModule, MessagesModule],
  controllers: [AppController],
  providers: [],
})

/**
 * the top-level app module.
 */
export class AppModule {
}
