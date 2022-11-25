import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm';

import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString
} from 'class-validator';

import { DomainModel } from 'src/domain/models';

import { 
  Authentication,
  Confirmation,
  Recovery
} from 'src/domain/business/slices/authentication/models';

@Entity()
export class User extends DomainModel {

  @IsString()
  @Column()
  public fullName: string;

  @IsString()
  @Column()
  public nickName: string;

  @IsPhoneNumber('BR')
  @Column()
  public phone: string;
  
  @IsString()
  @Column()
  public email: string;
  
  @IsString()
  @Column()
  public password: string;

  @IsString()
  @Column()
  public pushToken: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  public permissions: string;

  @OneToOne(() => Confirmation, confirmation => confirmation.user)
  @JoinColumn()
  public confirmation: Confirmation;

  @OneToMany(() => Recovery, recovery => recovery.user)
  @JoinColumn()
  public recoveries: Recovery[];

  @OneToMany(() => Authentication, recovery => recovery.user)
  @JoinColumn()
  public authentications: Authentication[];

}
