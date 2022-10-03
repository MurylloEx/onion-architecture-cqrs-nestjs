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
  fetchMyPosts(@Jwt() jwt: JwtDto) {
    return this.postService.fetchByUserId(jwt.id);
  }

  @Get('/post/filter/rules')
  @Permissions(Access.READ_POST_FILTER_RULES)
  fetchPostFilterRules() {
    return this.postService.fetchFilterRules();
  }

  @Get('/post/filter')
  @Permissions(Access.READ_POSTS)
  fetchPostsByFilters() {
    return this.postService.fetchByFilter('filter', 'type');
  }

  @Post('/post')
  @Permissions(
    Access.CREATE_POSTS,
    Access.READ_OWN_POSTS
  )
  createPost(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch('/post/:id')
  @Permissions(
    Access.UPDATE_POSTS, 
    Access.READ_POSTS
  )
  updatePost(
    @Param('id') id: string, 
    @Body() post: UpdatePostDto
  ) {	
    return this.postService.updateById(id, post);
  }

  @Delete('/post/:id')
  @Permissions(
    Access.DELETE_POSTS, 
    Access.READ_POSTS
  )
  deletePost(@Param('id') id: string) {
    return this.postService.deleteById(id);
  }

}
