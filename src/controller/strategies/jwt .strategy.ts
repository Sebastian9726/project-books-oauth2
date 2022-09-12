import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import generalConfig from 'src/common/configuration/general.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: generalConfig.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub?payload.sub:'', aud:payload.aud?payload.aud:'',   username: payload.user?payload.user:'', iat: payload.iat?payload.iat:'' };
  }
}