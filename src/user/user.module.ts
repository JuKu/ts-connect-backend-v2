import {Module} from "@nestjs/common";
import {UserService} from "./user/user.service";

@Module({
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
