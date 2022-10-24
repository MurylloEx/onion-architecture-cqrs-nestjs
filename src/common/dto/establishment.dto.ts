import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  Min,
  Max,
  IsNumber,
  IsInt,
  IsPhoneNumber,
  IsLatitude,
  IsLongitude,
  IsDate
} from 'class-validator';

export class EstablishmentDto {

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  public name: string;

  @IsString()
  @Matches(new RegExp(/^\w+(\s*,\s*\w+)*$/ig))
  public types: string;

  @Min(0)
  @Max(5)
  @IsNumber()
  public rating: number;

  @Min(0)
  @IsInt()
  public totalRatings: number;

  @IsPhoneNumber('BR')
  public phone: string;

  @IsLatitude()
  public latitude: number;

  @IsLongitude()
  public longitude: number;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
