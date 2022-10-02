import { PostType } from 'src/domain';
import { IsString, IsDefined, IsEnum, IsBoolean } from 'class-validator';

export class PostFilterRuleDto {

  @IsString()
  @IsDefined()
  public pictureId: string;

  @IsString()
  @IsDefined()
  @IsEnum(PostType)
  public type: PostType;

  @IsString()
  @IsDefined()
  public label: string;

  @IsBoolean()
  @IsDefined()
  public hidden: boolean;

}
