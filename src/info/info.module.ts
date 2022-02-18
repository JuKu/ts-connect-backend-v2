import {Module} from "@nestjs/common";
import {VersionService} from "./version-service/version.service";
import {VersionController}
  from "./version-controller/version.controller";

@Module({
  controllers: [VersionController],
  providers: [VersionService],
})
/**
 * This module is responsible for all information endpoints,
 * like /api/version and also the server status.
 *
 * @author Justin Kuenzel
 */
export class InfoModule {
}
