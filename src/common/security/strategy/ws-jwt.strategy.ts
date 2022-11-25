import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtDto } from 'src/common/dto';
import { ConfigurationService } from 'src/common/services';
import { fromWebsocketConnection } from 'src/common/security/extractors';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {

  constructor(protected readonly configurationService: ConfigurationService) {
    super({
      jwtFromRequest: fromWebsocketConnection(),
      ignoreExpiration: configurationService.security.jwt.ignoreExpiration,
      secretOrKey: configurationService.security.jwt.symmetricKey,
    });
  }

  async validate(payload: JwtDto) {
    return payload;
  }

}
