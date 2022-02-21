import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
/**
 * This auth guard protects routes against unauthenticated users.
 */
export class LocalAuthGuard extends AuthGuard("local") {}
