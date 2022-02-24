import {Controller, Get} from "@nestjs/common";
import {VersionService} from "../version-service/version.service";
import {Public} from "../../auth/public.decorator";

@Controller("/api/version")
/**
 * This controller provides an endpoint /api/version to show
 * the current version of backend.
 *
 * @author Justin Kuenzel
 */
export class VersionController {
  /**
   * The constructor.
   *
   * @param {VersionService} versionService the injected version service
   * @return {void}
   */
  constructor(private readonly versionService: VersionService) {
  }

  @Public()
  @Get("/")
  /**
   * Get the current version in the format {version: <major.minor.path>}.
   *
   * @public
   * @async
   * @return {Promise<any>} backend version
   */
  // eslint-disable-next-line require-jsdoc
  public async getVersion(): Promise<any> {
    return {
      version: await this.versionService.getCurrentBackendVersion(),
      startUpTime: this.versionService.getStartUpTimestamp(),
    };
  }
}
