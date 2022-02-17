import {Test, TestingModule} from "@nestjs/testing";
import {VersionController} from "./version.controller";

describe("VersionControllerController", () => {
  let controller: VersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionController],
    }).compile();

    // eslint-disable-next-line max-len
    controller = module.get<VersionController>(VersionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
