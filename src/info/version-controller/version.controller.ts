import {Controller, Get} from "@nestjs/common";
import {VersionService} from "../version-service/version.service";
import {Version} from "../version.interface";

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

  @Get("/")
  /**
   * Get the current version in the format {version: <major.minor.path>}.
   *
   * @return {Promise<Version>} backend version
   */
  public async getVersion(): Promise<Version> {
    return {
      version: await this.versionService.getCurrentBackendVersion(),
    };
  }
}
