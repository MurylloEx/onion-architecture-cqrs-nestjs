import { IsString, MinLength } from 'class-validator';

export class RecoveryDto {

  @IsString()
  @MinLength(6)
  public newPassword: string;

}
