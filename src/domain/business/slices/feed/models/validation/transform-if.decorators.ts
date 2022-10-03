import { Transform } from 'class-transformer';
import { PostTransformFnParams, PostType } from 'src/domain/business/slices/feed/types';

export const AssignIfPostTypeIs = (type: PostType) => Transform(
  (params: PostTransformFnParams) => params.obj.type === type ? params.value : undefined
);