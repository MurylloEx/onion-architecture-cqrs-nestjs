import { Exclude } from 'class-transformer';
import { 
  IsDate,
  IsDefined, 
  IsInt, 
  IsNumber, 
  IsPositive, 
  IsString, 
  IsUUID, 
  MaxLength, 
  MinLength 
} from 'class-validator';

import { UserDto } from './user.dto';

export class PetDto {

  @IsUUID('4')
  @IsString()
  @IsDefined()
  public id: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public name: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public species: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public breed: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public place: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public color: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public sex: string;

  @IsDefined()
  @IsPositive()
  @IsNumber()
  @IsInt()
  public age: number;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  public description: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  public habits: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  public allergies: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  public fears: string;

  @IsString()
  @IsDefined()
  public pictureId: string;

  @Exclude()
  public user: UserDto;

  @Exclude()
  @IsDate()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  public deletedAt: Date;

}
