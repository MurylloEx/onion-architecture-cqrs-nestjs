import { Exclude } from 'class-transformer';
import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator';

export class ConfirmationDto {
  
  @IsUUID()
  @IsDefined()
  public id: string;
  
  @Exclude()
  @IsString()
  @IsDefined()
  @IsUUID()
  public code: string;
  
  @IsUUID()
  public userId: string;
  
  @IsDate()
  public createdAt: Date;
  
  @Exclude()
  @IsDate()
  public updatedAt: Date;
  
  @Exclude()
  @IsDate()
  public deletedAt: Date;

}
