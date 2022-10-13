import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsInt,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
  Max,
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
  @ApiHideProperty()
  public password: string;

  @Exclude()
  @IsInt()
  @IsNumber()
  @IsPositive()
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiHideProperty()
  public descriptor: number;

  @Exclude()
  @IsString()
  @IsDefined()
  @ApiHideProperty()
  public pushToken: string;

  @IsString()
  @IsDefined()
  public pictureId: string;

  @IsDate()
  public createdAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
