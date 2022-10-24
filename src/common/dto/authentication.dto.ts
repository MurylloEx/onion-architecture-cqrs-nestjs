import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID, IsDefined, IsString, IsDate } from 'class-validator';
import { UserDto } from './user.dto';

export class AuthenticationDto {

  @IsUUID('4')
  @IsDefined()
  public id: string;

  @IsUUID('4')
  public userId: string;

  @Exclude()
  @IsString()
  @ApiHideProperty()
  public ipAddress: string;

  @IsString()
  public jwt: string;

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

  @IsDefined()
  public user: UserDto;

}
