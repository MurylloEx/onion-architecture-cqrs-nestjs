import { ValidateIf } from 'class-validator';
import { PostType } from 'src/domain/business/slices/feed/types';
import { Post } from 'src/domain/business/slices/feed/models';

export const ValidateIfPostTypeIs = (type: PostType) => ValidateIf(
  (post: Post) => post.type === type
);
