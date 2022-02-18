import {Test, TestingModule} from "@nestjs/testing";
import {VersionController} from "./version.controller";
import {VersionService} from "../version-service/version.service";

describe("VersionController", () => {
  let controller: VersionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionController],
      providers: [VersionService],
    }).compile();

    // eslint-disable-next-line max-len
    controller = module.get<VersionController>(VersionController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return a major.minor.patch version", async () => {
    const version = await controller.getVersion();
    expect(version).toBeDefined();

    const versionArray = version.version.split(".");
    expect(versionArray.length).toBe(3);
  });
});
