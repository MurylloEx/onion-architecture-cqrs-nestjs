import { Exclude } from 'class-transformer';
import { IsUUID, IsDefined, IsString, IsDate } from 'class-validator';
import { UserDto } from './user.dto';

export class AuthenticationDto {

  @IsUUID()
  @IsDefined()
  public id: string;

  @IsUUID()
  public userId: string;

  @Exclude()
  @IsString()
  public ipAddress: string;

  @IsString()
  public jwt: string;

  @IsDate()
  public createdAt: Date;

  @Exclude()
  @IsDate()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  public deletedAt: Date;

  @IsDefined()
  public user: UserDto;

}
