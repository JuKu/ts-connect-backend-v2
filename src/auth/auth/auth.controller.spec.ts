import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "./auth.controller";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("login() should be defined", async () => {
    expect(controller.login()).toBeDefined();
  });

  it("passwordForgotten() should be defined", async () => {
    expect(controller.passwordForgotten()).toBeDefined();
  });
});
