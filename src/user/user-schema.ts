import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type UserDocument = User & Document;

@Schema()
/**
 * This is the user database schema for the user object.
 *
 * @author Justin Kuenzel
 */
export class User {
  @Prop({required: true, index: true})
    username: string;

  @Prop({required: true})
    password: string;

  @Prop({required: true})
    salt: string;

  @Prop({required: true, index: true})
    email: string;

  @Prop({required: true})
    preName: string;

  @Prop({required: true})
    lastName: string;

  @Prop([String])
    invalidatedTokens: string[];

  @Prop({required: true})
    country: string;

  // 0 - male, 1 - female, 2 - diverse
  @Prop({required: true, enum: [0, 1, 2], default: 0})
    gender: number;

  @Prop([String])
    globalRoles: string[];

  @Prop([String])
    globalPermissions: string[];

  @Prop()
    deletable: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
