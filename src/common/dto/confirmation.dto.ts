import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator';

export class ConfirmationDto {
  
  @IsUUID('4')
  @IsDefined()
  public id: string;
  
  @Exclude()
  @IsString()
  @IsDefined()
  @IsUUID('4')
  @ApiHideProperty()
  public code: string;
  
  @IsUUID('4')
  public userId: string;
  
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
