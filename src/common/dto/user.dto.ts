import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString
} from 'class-validator';

export class UserDto {

  @IsString()
  @IsDefined()
  public fullName: string;

  @IsString()
  @IsDefined()
  public nickName: string;

  @IsPhoneNumber('BR')
  @IsDefined()
  public phone: string;

  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsDefined()
  public password: string;

  @IsString()
  @IsDefined()
  public pushToken: string;

  @IsString()
  @IsDefined()
  public pictureId: string;

}
