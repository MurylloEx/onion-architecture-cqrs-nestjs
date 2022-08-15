import { Exclude, Expose } from "class-transformer";
import { 
  IsEmail, 
  IsNumber, 
  IsPhoneNumber, 
  IsString, 
  Length, 
  MinLength
} from "class-validator";

@Exclude()
export class UserDto {

  @IsString()
  public id: string;

  @IsString()
  public sub: string;
  
  @Exclude()
  @IsNumber()
  public iat: number;

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
  public phone: string;
  
  @Expose()
  @IsEmail()
  public email: string;
  
  @IsString()
  @MinLength(6)
  public password: string;
  
  @Exclude()
  @IsString()
  public pushToken: string;

  @Expose()
  @IsString()
  public pictureId: string;

}
