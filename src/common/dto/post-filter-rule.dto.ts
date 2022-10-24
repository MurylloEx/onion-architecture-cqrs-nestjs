import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsEnum, IsBoolean, IsDate } from 'class-validator';
import { PostType } from 'src/domain';

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

  @IsDate()
  public createdAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
