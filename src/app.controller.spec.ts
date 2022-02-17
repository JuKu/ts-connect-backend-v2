import {Test, TestingModule} from "@nestjs/testing";
import {AppController} from "./app.controller";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    // eslint-disable-next-line max-len
    it("should return \"This is the public API of the ts-connect-app.\"", () => {
      // eslint-disable-next-line max-len
      expect(appController.getIndex()).toBe("This is the public API of the ts-connect-app.");
    });
  });
});
