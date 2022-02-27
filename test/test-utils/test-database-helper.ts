import {SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../src/user/user-schema";

export class ExecHelper<T> {
  constructor(private returnValue: T) {
  }
  public exec(): Promise<T> {
    return new Promise((resolve) => resolve.apply(this.returnValue));
  }
}

export class TestDatabaseHelper<T> {
  private data: T[];

  constructor(private model: T) {
  }

  public static create(model: any) {
    const schema = SchemaFactory.createForClass(User);
    return schema;
  }
}
