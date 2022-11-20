import { 
  IsDefined,
  IsNumber, 
  IsString 
} from 'class-validator';

import { UserDto } from 'src/common/dto/output';

export class JwtDto extends UserDto {

  @IsString()
  @IsDefined()
  public sub: string;
  
  @IsNumber()
  @IsDefined()
  public iat: number;

}
