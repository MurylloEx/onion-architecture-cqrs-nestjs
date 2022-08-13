import { IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @Length(6)
  public code: string;

  @IsString()
  @MinLength(4)
  @MaxLength(256)
  public password: string;
}
