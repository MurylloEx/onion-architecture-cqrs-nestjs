import { 
  IsDefined,
  IsNumber, 
  IsString 
} from 'class-validator';

import { UserDto } from './user.dto';

export class JwtDto extends UserDto {

  @IsString()
  @IsDefined()
  public sub: string;
  
  @IsNumber()
  @IsDefined()
  public iat: number;

}
