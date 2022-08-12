import { 
  IsEmail, 
  IsNumber, 
  IsPhoneNumber, 
  IsString 
} from "class-validator";

export class UserDto {

  @IsString()
  public sub: string;
  
  @IsNumber()
  public iat: number;

  @IsString()
  public fullName: string;

  @IsString()
  public nickName: string;

  @IsPhoneNumber('BR')
  public phone: string;
  
  @IsEmail()
  public email: string;
  
  @IsString()
  public password: string;
  
  @IsString()
  public pushToken: string;

  @IsString()
  public pictureId: string;

}
