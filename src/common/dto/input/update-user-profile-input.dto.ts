import { 
  IsEmail,
  IsOptional,
  IsPhoneNumber, 
  IsString, 
  Length
} from 'class-validator';

import { SafeBufferTransform } from 'src/common/security';

export class UpdateUserProfileDto {

  @IsString()
  @Length(4, 64)
  @IsOptional()
  public fullName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @Length(4, 32)
  @IsOptional()
  public nickName: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  public phone: string;

}
