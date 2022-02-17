import {Module} from "@nestjs/common";
import {VersionService} from "./version-service/version.service";
import {VersionControllerController}
  from "./version-controller/version-controller.controller";

@Module({
  controllers: [VersionControllerController],
  providers: [VersionService],
})
export class InfoModule {
}
