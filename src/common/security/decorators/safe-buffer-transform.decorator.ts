import { Transform } from 'class-transformer';

const PICTURE_BUFFER_PREFIX = new RegExp(/^data:image\/(png|jpeg|jpg);base64,/);

export const SafeBufferTransform = () => 
  Transform(({ value }) => Buffer.from(value.replace(PICTURE_BUFFER_PREFIX, ''), 'base64'));
