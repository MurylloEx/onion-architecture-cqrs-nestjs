import { Exclude, Expose } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength
} from 'class-validator';

@Exclude()
export class UserDto {

  @IsString()
  public id: string;

  @Expose()
  @IsString()
  @Length(4, 64)
  public fullName: string;

  @Expose()
  @IsString()
  @Length(4, 32)
  public nickName: string;

  @Expose()
  @IsPhoneNumber('BR')
  @IsDefined()
  public phone: string;

  @Expose()
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @Exclude()
  @IsString()
  @IsDefined()
  public pushToken: string;

  @Expose()
  @IsString()
  @IsDefined()
  public pictureId: string;

}
