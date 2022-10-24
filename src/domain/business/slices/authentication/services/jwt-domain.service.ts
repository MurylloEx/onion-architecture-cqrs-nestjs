import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigurationDomainService } from 'src/domain/config';

@Injectable()
export class JwtDomainService {

  constructor(
    private readonly configurationDomainService: ConfigurationDomainService,
    private readonly jwtService: JwtService
  ) { }

  sign<T extends object>(subject: string, payload: T): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configurationDomainService.security.jwt.symmetricKey,
      issuer: this.configurationDomainService.security.jwt.issuer,
      subject
    });
  }

  verify<T extends object>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token, {
      secret: this.configurationDomainService.security.jwt.symmetricKey,
      issuer: this.configurationDomainService.security.jwt.issuer
    });
  }

  parse(token: string): string | Record<string, any> {
    return this.jwtService.decode(token);
  }

}
