import { Column, Entity } from 'typeorm';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

import { DomainModel } from 'src/domain/models';

@Entity()
export class Establishment extends DomainModel {

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  public name: string;

  @IsString()
  @Column()
  @Matches(new RegExp(/^\w+(\s*,\s*\w+)*$/ig))
  public types: string;

  @Min(0)
  @Max(5)
  @IsNumber()
  @Column()
  public rating: number;

  @Min(0)
  @IsInt()
  @Column()
  public totalRatings: number;

  @Column()
  @IsPhoneNumber('BR')
  public phone: string;

  @Column()
  @IsLatitude()
  public latitude: number;

  @Column()
  @IsLongitude()
  public longitude: number;

}
