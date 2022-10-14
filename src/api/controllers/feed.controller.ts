import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import {
  Permissions,
  Access,
  PostDto,
  PostService,
  Security,
  CreatePostDto,
  UpdatePostDto,
  JwtDto,
  Jwt
} from 'src/common';

@ApiTags('Feed')
@Security()
@Controller('/feed')
export class FeedController {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('/post/all')
  @Permissions(Access.READ_POSTS)
  fetchAllPosts(): Promise<PostDto[]> {
    return this.postService.fetch();
  }

  @Get('/post/my')
  @Permissions(Access.READ_OWN_POSTS)
  fetchMyPosts(@Jwt() jwt: JwtDto): Promise<PostDto[]> {
    return this.postService.fetchByUserId(jwt.id);
  }

  @Post('/post')
  @Permissions(
    Access.CREATE_POSTS,
    Access.READ_OWN_POSTS
  )
  createPost(@Jwt() jwt: JwtDto, @Body() post: CreatePostDto): Promise<PostDto> {
    return this.postService.create(jwt.id, post);
  }

  @Patch('/post/:id')
  @Permissions(
    Access.UPDATE_POSTS, 
    Access.READ_POSTS
  )
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto): Promise<PostDto> {	
    return this.postService.updateById(id, post);
  }

  @Delete('/post/:id')
  @Permissions(
    Access.DELETE_POSTS, 
    Access.READ_POSTS
  )
  deletePost(@Param('id') id: string): Promise<PostDto> {
    return this.postService.deleteById(id);
  }

}
