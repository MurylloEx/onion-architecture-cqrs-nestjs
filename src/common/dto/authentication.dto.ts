import { Exclude } from 'class-transformer';
import { IsUUID, IsDefined, IsString, IsDate } from 'class-validator';

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

}
