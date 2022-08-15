import { 
  IsPhoneNumber, 
  IsString, 
  Length
} from 'class-validator';

export class UpdateUserDto {

  @IsString()
  @Length(4, 64)
  public fullName: string;

  @IsString()
  @Length(4, 32)
  public nickName: string;

  @IsPhoneNumber('BR')
  public phone: string;

  @IsString()
  public pictureId: string;

}
