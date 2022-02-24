import {JwtAuthGuard} from "./jwt-auth.guard";
import {Reflector} from "@nestjs/core";
import {Type} from "@nestjs/common";

describe("JwtAuthGuard", () => {
  it("should be defined", () => {
    const reflector: Reflector = {
      // eslint-disable-next-line max-len,@typescript-eslint/ban-types
      get: function <TResult = any, TKey = any>(metadataKey: TKey, target: Function | Type<any>): TResult {
        throw new Error("Function not implemented.");
      },
      // eslint-disable-next-line max-len,@typescript-eslint/ban-types
      getAll: function <TResult extends any[] = any[], TKey = any>(metadataKey: TKey, targets: (Function | Type<any>)[]): TResult {
        throw new Error("Function not implemented.");
      },
      // eslint-disable-next-line max-len,@typescript-eslint/ban-types
      getAllAndMerge: function <TResult extends any[] = any[], TKey = any>(metadataKey: TKey, targets: (Function | Type<any>)[]): TResult {
        throw new Error("Function not implemented.");
      },
      // eslint-disable-next-line max-len,@typescript-eslint/ban-types
      getAllAndOverride: function <TResult = any, TKey = any>(metadataKey: TKey, targets: (Function | Type<any>)[]): TResult {
        throw new Error("Function not implemented.");
      },
    };
    expect(new JwtAuthGuard(reflector)).toBeDefined();
  });
});
