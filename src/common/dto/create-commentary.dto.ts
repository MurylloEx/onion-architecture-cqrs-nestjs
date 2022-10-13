
import { IsDefined, IsString, Length } from 'class-validator';

export class CreateCommentaryDto {

  @Length(4, 512)
  @IsString()
  @IsDefined()
  public text: string;

}
