import { 
  IsBoolean,
  IsDefined, 
  IsInt, 
  IsNumber, 
  IsPositive, 
  IsString, 
  MaxLength, 
  MinLength 
} from 'class-validator';

import { SafeBufferTransform } from 'src/common/security';

export class CreatePetDto {

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

  @IsDefined()
  @IsBoolean()
  public hasPedigree: boolean;

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

  @IsDefined()
  @SafeBufferTransform()
  public pictureBuffer: Buffer;

}
