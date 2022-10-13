import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  Min,
  IsDate
} from 'class-validator';

import { PostType } from 'src/domain';

import { UserDto } from './user.dto';
import { PetDto } from './pet.dto';

export class PostDto {

  @Exclude()
  @IsInt()
  @IsNumber()
  @IsPositive()
  @ApiHideProperty()
  public offset: number;

  @IsString()
  @IsEnum(PostType)
  public type: PostType;

  @IsString()
  public pictureId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(64)
  public localization: string;

  @IsString()
  @MinLength(16)
  @MaxLength(512)
  public description: string;

  @Exclude()
  @Min(0)
  @IsInt()
  @IsNumber()
  @ApiHideProperty()
  public reports: number;

  @IsDate()
  public lostDate?: Date;

  @IsNumber()
  @IsPositive()
  public lostReward?: number;

  @IsString()
  public lostCircumstance?: string;

  public pet: PetDto;

  public user: UserDto;

  @Exclude()
  @IsDate()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
