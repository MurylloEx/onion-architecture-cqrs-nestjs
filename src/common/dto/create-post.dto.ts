import { PostType } from 'src/domain';
import { SafeBufferTransform } from 'src/common/security';
import { Type } from 'class-transformer';
import { 
  IsDate,
  IsDefined, 
  IsEnum, 
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf
} from 'class-validator';

export class CreatePostDto {

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PostType)
  public type: string;

  @IsDefined()
  @IsUUID('4')
  public petId: string;

  @IsDefined()
  @SafeBufferTransform()
  public pictureBuffer: Buffer;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public localization: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsDate()
  @Type(() => Date)
  @IsDefined()
  @ValidateIf((post: CreatePostDto) => post.type === PostType.LOST)
  public lostDate?: Date;

  @IsDefined()
  @IsPositive()
  @IsNumber()
  @ValidateIf((post: CreatePostDto) => post.type === PostType.LOST)
  public lostReward?: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((post: CreatePostDto) => post.type === PostType.LOST)
  public lostCircumstance?: string;

}
