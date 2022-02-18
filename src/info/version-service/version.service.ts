import {Injectable} from "@nestjs/common";
import {getVersion} from "get-own-version";

@Injectable()
/**
 * This service is responsible for getting the current backend version.
 *
 * @author Justin Kuenzel
 */
export class VersionService {
  /**
   * Get the current backend version as format Major.Minor.Patch .
   *
   * @return {string} backend version
   */
  public async getCurrentBackendVersion() {
    return getVersion();
  }
}
