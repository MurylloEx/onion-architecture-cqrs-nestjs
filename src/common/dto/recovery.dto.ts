import { Exclude } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class RecoveryDto {

  @Exclude()
  public user: UserDto;

  @Exclude()
  @IsString()
  public code: string;

  @Exclude()
  @IsDate()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  public deletedAt: Date;

}
