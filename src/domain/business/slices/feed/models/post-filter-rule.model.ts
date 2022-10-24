import { Column, Entity } from 'typeorm';
import { IsBoolean, IsDefined, IsEnum, IsString } from 'class-validator';

import { DomainModel } from 'src/domain/models';
import { PostType } from 'src/domain/business/slices/feed/types';

@Entity()
export class PostFilterRule extends DomainModel {

  @IsString()
  @IsDefined()
  @Column()
  public pictureId: string;

  @IsString()
  @IsDefined()
  @IsEnum(PostType)
  @Column()
  public type: PostType;

  @IsString()
  @IsDefined()
  @Column()
  public label: string;

  @IsBoolean()
  @IsDefined()
  @Column()
  public hidden: boolean = false;

}
