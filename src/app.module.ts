import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})

/**
 * the top-level app module.
 */
export class AppModule {
}
