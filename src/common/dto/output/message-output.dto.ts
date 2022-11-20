import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class MessageDto {

  @IsUUID('4')
  @IsOptional()
  public id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  public title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(256)
  public description: string;

}
