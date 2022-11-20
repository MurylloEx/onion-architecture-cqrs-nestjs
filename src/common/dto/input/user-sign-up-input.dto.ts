import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MinLength
} from 'class-validator';

export class UserSignUpDto {

  @IsString()
  @Length(4, 64)
  public fullName: string;

  @IsString()
  @Length(4, 32)
  @Matches(new RegExp(/^\w+$/i))
  @Transform(({ value }) => String(value).toLocaleLowerCase())
  public nickName: string;

  @IsPhoneNumber('BR')
  @IsDefined()
  public phone: string;

  @IsEmail()
  @IsDefined()
  @Transform(({ value }) => String(value).toLowerCase())
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsDefined()
  public pushToken: string;

}
