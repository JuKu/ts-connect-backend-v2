import {Module} from "@nestjs/common";
import {AuthController} from "../auth/auth/auth.controller";
import {AuthService} from "../auth/auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
/**
 * this module is responsible for all endpoints which starts with /user/** .
 *
 * @author Justin Kuenzel
 */
export class UserModule {}
