import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { UserDto } from './user-output.dto';

export class RecoveryDto {

  @Exclude()
  public user: UserDto;

  @Exclude()
  @IsString()
  @ApiHideProperty()
  public code: string;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
