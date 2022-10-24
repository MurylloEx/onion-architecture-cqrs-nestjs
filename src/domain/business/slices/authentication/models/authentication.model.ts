import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DomainModel } from 'src/domain/models';
import { User } from 'src/domain/business/slices/user';

@Entity()
export class Authentication extends DomainModel {
  
  @ManyToOne(() => User, user => user.authentications)
  public user: User;

  @IsString()
  @Column()
  public ipAddress: string;

  @IsString()
  @Column()
  public jwt: string;

}
