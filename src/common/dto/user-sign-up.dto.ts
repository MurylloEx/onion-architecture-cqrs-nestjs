import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength
} from 'class-validator';

const PICTURE_BUFFER_PREFIX = new RegExp(/^data:image\/(png|jpeg|jpg);base64,/);

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
  @Transform(({ value }) => Buffer.from(value.replace(PICTURE_BUFFER_PREFIX, ''), 'base64'))
  public pictureBuffer: Buffer;

}
