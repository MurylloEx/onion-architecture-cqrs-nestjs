import { IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { DomainModel } from 'src/domain/models';
import { User } from 'src/domain/business/slices/user';

@Entity()
export class Recovery extends DomainModel {
  
  @ManyToOne(() => User, user => user.recoveries)
  public user: User;

  @IsString()
  @Length(4, 4)
  @Column()
  public code: string;

}
