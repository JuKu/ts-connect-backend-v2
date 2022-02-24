import {Module} from "@nestjs/common";
import {UserService} from "./user/user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user-schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
/**
 * this module is responsible for all endpoints which starts with /user/** .
 *
 * @author Justin Kuenzel
 */
export class UserModule {}
