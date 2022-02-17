import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";

@Controller()
/**
 * The basic app controller.
 */
export class AppController {
  /**
   * the constructor.
   */
  constructor(private readonly appService: AppService) {
  }

  @Get()
  /**
   * hello greeter controller.
   *
   * @return {string} response
   */
  getHello(): string {
    return this.appService.getHello();
  }
}
