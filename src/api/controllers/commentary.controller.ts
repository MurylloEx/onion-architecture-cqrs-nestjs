import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { 
  Access, 
  Security, 
  Permissions,
  CommentaryDto,
  Jwt,
  JwtDto,
  CommentaryService
} from 'src/common';

@ApiTags('Commentary')
@Security()
@Controller('/commentary')
export class CommentaryController {

  constructor(
    private readonly commentaryService: CommentaryService
  ) {}

  @Get('/:postId/all')
  @Permissions(
    Access.READ_COMMENTARIES, 
    Access.READ_POSTS
  )
  fetchByPostId(@Param('postId') postId: string): Promise<CommentaryDto[]> {
    return this.commentaryService.fetchByPostId(postId);
  }

  @Post('/:postId')
  @Permissions(
    Access.CREATE_COMMENTARY, 
    Access.READ_COMMENTARIES,
    Access.UPDATE_POSTS,
    Access.READ_POSTS
  )
  createByPostId(
    @Param('postId') postId: string, 
    @Jwt() jwt: JwtDto, 
    @Body() commentary: CommentaryDto
  ): Promise<CommentaryDto> 
  {
    return this.commentaryService.create(jwt.id, postId, commentary.text);
  }

}
