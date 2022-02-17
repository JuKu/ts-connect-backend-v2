import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import { UserModule } from './user/user.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [UserModule, InfoModule],
  controllers: [AppController],
  providers: [],
})

/**
 * the top-level app module.
 */
export class AppModule {
}
