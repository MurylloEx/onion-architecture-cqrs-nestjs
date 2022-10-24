import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationService } from 'src/common/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(protected readonly configurationService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configurationService.security.jwt.ignoreExpiration,
      secretOrKey: configurationService.security.jwt.symmetricKey,
    });
  }

  async validate(payload: any) {
    return payload;
  }
  
}
