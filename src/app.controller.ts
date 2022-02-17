import {Controller, Get} from "@nestjs/common";

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

  @Get()
  /**
   * hello greeter controller.
   *
   * @return {string} response
   */
  // eslint-disable-next-line require-jsdoc
  getIndex(): string {
    return "This is the public API of the ts-connect-app.";
  }
}
