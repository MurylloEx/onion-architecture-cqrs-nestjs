import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MaxLength,
  MinLength
} from 'class-validator';

import { DomainModel } from 'src/domain/models';
import { Pet } from 'src/domain/business/slices/pet/models';
import { User } from 'src/domain/business/slices/user/models';
import { PostType } from 'src/domain/business/slices/feed/types';
import { Commentary } from 'src/domain/business/slices/commentary/models';
import { 
  AssignIfPostTypeIs, 
  ValidateIfPostTypeIs 
} from 'src/domain/business/slices/feed/models/validation';

@Entity()
export class Post extends DomainModel {

  @IsInt()
  @IsNumber()
  @IsPositive()
  @Unique(['offset'])
  @Column()
  public offset: number;

  @IsDefined()
  @IsString()
  @IsEnum(PostType)
  @Column()
  public type: PostType;

  @IsString()
  @IsDefined()
  @Column()
  public pictureId: string;

  @IsString()
  @IsDefined()
  @MinLength(4)
  @MaxLength(64)
  @Column()
  public localization: string;

  @IsDefined()
  @IsString()
  @MinLength(16)
  @MaxLength(512)
  @Column()
  public description: string;

  @IsDefined()
  @Min(0)
  @IsInt()
  @IsNumber()
  @Column()
  public reports: number;

  @IsDate()
  @ValidateIfPostTypeIs(PostType.LOST)
  @AssignIfPostTypeIs(PostType.LOST)
  @Column({ nullable: true })
  public lostDate?: Date;

  @IsNumber()
  @IsPositive()
  @ValidateIfPostTypeIs(PostType.LOST)
  @AssignIfPostTypeIs(PostType.LOST)
  @Column({ nullable: true })
  public lostReward?: number;

  @IsString()
  @ValidateIfPostTypeIs(PostType.LOST)
  @AssignIfPostTypeIs(PostType.LOST)
  @Column({ nullable: true })
  public lostCircumstance?: string;

  @IsDefined()
  @ManyToOne(() => Pet, pet => pet.posts)
  public pet: Pet;

  @IsDefined()
  @ManyToOne(() => User, user => user.posts)
  public user: User;

  @OneToMany(() => Commentary, commentary => commentary.post)
  @JoinColumn()
  public commentaries: Commentary[];

}
