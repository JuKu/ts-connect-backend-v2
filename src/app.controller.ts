import {Controller, Get} from "@nestjs/common";
import {Public} from "./auth/public.decorator";

@Controller()
/**
 * The basic app controller.
 */
export class AppController {
  /**
   * the constructor.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function,require-jsdoc
  constructor() {
  }

  @Public()
  @Get()
  /**
   * index controller.
   *
   * @return {string} response
   */
  // eslint-disable-next-line require-jsdoc
  getIndex(): string {
    return "This is the public API of the ts-connect-app.";
  }
}
