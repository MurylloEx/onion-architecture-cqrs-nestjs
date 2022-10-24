import { Column, Entity, OneToOne } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';

import { DomainModel } from 'src/domain/models';
import { User } from 'src/domain/business/slices/user';

@Entity()
export class Confirmation extends DomainModel {
  
  @OneToOne(() => User, user => user.confirmation)
  public user: User;

  @IsString()
  @IsUUID('4')
  @Column()
  public code: string;

}
