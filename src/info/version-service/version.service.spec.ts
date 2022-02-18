import {Test, TestingModule} from "@nestjs/testing";
import {VersionService} from "./version.service";

describe("VersionServiceService", () => {
  let service: VersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionService],
    }).compile();

    service = module.get<VersionService>(VersionService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return a none empty string", () => {
    expect(service.getCurrentBackendVersion()).toBeDefined();
    expect(service.getCurrentBackendVersion()).not.toBeNull();
    expect(service.getCurrentBackendVersion()).toBeTruthy();
  });

  it("should return version in format major.minor.patch", async () => {
    const version: string = await service.getCurrentBackendVersion();
    const versionArr: Array<string> = version.split(".");

    // check the major.minor.patch format
    expect(versionArr.length).toBe(3);
  });
});
