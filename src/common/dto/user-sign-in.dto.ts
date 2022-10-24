import { Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class UserSignInDto {

  @IsEmail()
  @IsDefined()
  @Transform(({ value }) => String(value).toLocaleLowerCase())
  public email: string;

  @IsString()
  @MinLength(6)
  public password: string;

  @IsString()
  @IsDefined()
  public pushToken: string;

}
