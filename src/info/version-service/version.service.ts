import {Injectable, OnModuleInit} from "@nestjs/common";
import {getVersion} from "get-own-version";
import moment from "moment";

@Injectable()
/**
 * This service is responsible for getting the current backend version.
 *
 * @author Justin Kuenzel
 */
export class VersionService implements OnModuleInit {
  private startUpTime: Date;

  /**
   * Get the current backend version as format Major_Minor_Patch.
   *
   * @async
   * @return {Promise<string>} backend version
   */
  public async getCurrentBackendVersion() {
    return getVersion();
  }

  /**
   * Get the startup time of this application.
   *
   * @return {string} startup timestamp
   */
  public getStartUpTimestamp(): string {
    if (this.startUpTime == undefined) {
      this.onModuleInit();
    }

    const formattedDate: string = this.startUpTime
        .toISOString();
    return formattedDate; // this.startUpTime.toLocaleString();
  }

  /**
   * This method is executed once, if the module is initalized.
   *
   * @return {void}
   */
  onModuleInit(): void {
    this.startUpTime = new Date();
  }
}
