import { Exclude } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class RecoveryDto {

  @Exclude()
  public user: UserDto;

  @Exclude()
  @IsString()
  public code: string;

}
