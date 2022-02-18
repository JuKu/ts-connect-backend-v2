import {Module} from "@nestjs/common";
import {VersionService} from "./version-service/version.service";
import {VersionController}
  from "./version-controller/version.controller";

@Module({
  controllers: [VersionController],
  providers: [VersionService],
})
export class InfoModule {
}
