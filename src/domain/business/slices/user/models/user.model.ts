import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne
} from 'typeorm';

import {
  IsInt,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max
} from 'class-validator';

import { DomainModel } from 'src/domain/models';

import { Pet } from 'src/domain/business/slices/pet/models';

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
  @Column()
  public pictureId: string;

  @IsInt()
  @IsNumber()
  @IsPositive()
  @Max(Number.MAX_SAFE_INTEGER)
  @Column()
  public descriptor: number;

  @OneToOne(() => Confirmation, confirmation => confirmation.user)
  @JoinColumn()
  public confirmation: Confirmation;

  @OneToMany(() => Recovery, recovery => recovery.user)
  @JoinColumn()
  public recoveries: Recovery[];

  @OneToMany(() => Authentication, recovery => recovery.user)
  @JoinColumn()
  public authentications: Authentication[];

  @OneToMany(() => Pet, pet => pet.user)
  @JoinColumn()
  public pets: Pet[];

}
