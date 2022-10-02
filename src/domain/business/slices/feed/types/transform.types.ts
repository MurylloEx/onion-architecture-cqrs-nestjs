import { TransformFnParams } from 'class-transformer';
import { Post } from 'src/domain/business/slices/feed/models';

export interface PostTransformFnParams extends TransformFnParams {
  obj: Post;
}
