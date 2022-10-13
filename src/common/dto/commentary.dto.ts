import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsString, IsUUID, Length } from 'class-validator';
import { PostDto } from './post.dto';
import { UserDto } from './user.dto';

export class CommentaryDto {

  @IsUUID('4')
  @IsDefined()
  public id: string;

  @Length(4, 154)
  @IsString()
  @IsDefined()
  public text: string;

  @IsDefined()
  public user: UserDto;

  @Exclude()
  @IsDefined()
  @ApiHideProperty()
  public post: PostDto;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public updatedAt: Date;

  @Exclude()
  @IsDate()
  @ApiHideProperty()
  public deletedAt: Date;

}
