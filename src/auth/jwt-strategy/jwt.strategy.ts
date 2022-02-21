import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("auth.jwt.secret"),
    });
  }

  /**
   * Validate the payload and return a json object.
   *
   * From the documentation: The validate() method deserves some discussion.
   * For the jwt-strategy, Passport first verifies the JWT's signature and
   * decodes the JSON. It then invokes our validate() method passing the
   * decoded JSONas its single parameter. Based on the way JWT signing works,
   * we're guaranteed that we're receiving a valid token that we have
   * previously signed and issued to a valid user.
   * See also: https://docs.nestjs.com/security/authentication#implementing-passport-jwt
   *
   * @async
   * @param {any} payload the json decoded payload from the JWT token
   * @return {Promise<any>} decoded json object
   */
  async validate(payload: any): Promise<any> {
    return {userId: payload.sub, username: payload.username};
  }
}
