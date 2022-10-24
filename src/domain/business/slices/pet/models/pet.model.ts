import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

import { DomainModel } from 'src/domain/models';
import { User } from 'src/domain/business/slices/user/models';
import { Post } from 'src/domain/business/slices/feed/models';

@Entity()
export class Pet extends DomainModel {

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public name: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public species: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public breed: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public place: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public color: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public sex: string;

  @IsDefined()
  @IsPositive()
  @IsNumber()
  @IsInt()
  @Column()
  public age: number;

  @IsBoolean()
  @IsDefined()
  @Column()
  public hasPedigree: boolean;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  @Column()
  public description: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  @Column()
  public habits: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(256)
  @Column()
  public allergies: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(32)
  @Column()
  public fears: string;

  @IsString()
  @IsDefined()
  @Column()
  public pictureId: string;

  @ManyToOne(() => User, user => user.pets)
  public user: User;

  @OneToMany(() => Post, post => post.pet)
  @JoinColumn()
  public posts: Post[];

}
