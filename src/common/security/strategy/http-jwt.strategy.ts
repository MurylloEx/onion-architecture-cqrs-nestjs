import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtDto } from 'src/common/dto';
import { ConfigurationService } from 'src/common/services';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  
  constructor(protected readonly configurationService: ConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configurationService.security.jwt.ignoreExpiration,
      secretOrKey: configurationService.security.jwt.symmetricKey,
    });
  }

  async validate(payload: JwtDto) {
    return payload;
  }
  
}
