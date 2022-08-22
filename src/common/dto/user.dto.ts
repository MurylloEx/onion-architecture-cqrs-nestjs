import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength
} from 'class-validator';

export class UserDto {

  @IsString()
  public id: string;

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

  @Exclude()
  @IsString()
  @MinLength(6)
  public password: string;

  @Exclude()
  @IsString()
  @IsDefined()
  public pushToken: string;

  @IsString()
  @IsDefined()
  public pictureId: string;

  @IsDate()
  public createdAt: Date;

  @Exclude()
  @IsDate()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  public deletedAt: Date;

}
