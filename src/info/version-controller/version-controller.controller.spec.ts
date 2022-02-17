import {Test, TestingModule} from "@nestjs/testing";
import {VersionControllerController} from "./version-controller.controller";

describe("VersionControllerController", () => {
  let controller: VersionControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionControllerController],
    }).compile();

    // eslint-disable-next-line max-len
    controller = module.get<VersionControllerController>(VersionControllerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
