import {
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength
} from 'class-validator';

import { SafeBufferTransform } from 'src/common/security';

export class UserSignUpDto {

  @IsString()
  @Length(4, 64)
  public fullName: string;

  @IsString()
  @Length(4, 32)
  public nickName: string;

  @IsPhoneNumber('BR')
  @IsDefined()
  public phone: string;

  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsDefined()
  public pushToken: string;

  @IsDefined()
  @SafeBufferTransform()
  public pictureBuffer: Buffer;

}
