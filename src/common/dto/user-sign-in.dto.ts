import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class UserSignInDto {

  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsDefined()
  public pushToken: string;

}
