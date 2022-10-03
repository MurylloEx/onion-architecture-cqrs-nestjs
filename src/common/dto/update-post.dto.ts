import {
  IsOptional,
  IsString
} from 'class-validator';

export class UpdatePostDto {

  @IsOptional()
  @IsString()
  public localization: string;

  @IsOptional()
  @IsString()
  public description: string;

}
