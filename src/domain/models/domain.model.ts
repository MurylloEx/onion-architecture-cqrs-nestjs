import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';

import { 
  ClassConstructor, 
  instanceToPlain, 
  plainToInstance 
} from 'class-transformer';

import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { DomainException } from 'src/domain/exceptions';

export class DomainModel extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new DomainException(errors, HttpStatus.BAD_REQUEST);
    }
  }

  toDto<T>(dtoClass: ClassConstructor<T>): T {
    const plain = instanceToPlain(this);
    return plainToInstance<T, Record<string, any>>(dtoClass, plain);
  }

}
