import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Logging } from 'src/domain/business/slices/logging/models';
import { LoggingType } from 'src/domain/business/slices/logging/types';

@Injectable()
export class LoggingRepository {

  constructor(
    @InjectRepository(Logging)
    private repository: Repository<Logging>,
  ) {}

  create(
    type: LoggingType, 
    serviceName: string, 
    message: string, 
    description: string, 
    object: string, 
    error: string
  ): Promise<Logging> {
    const logging = this.repository.create({ 
      type,
      serviceName, 
      message, 
      description,
      object,
      error
    });
    return this.repository.save(logging);
  }

  fetch(options?: FindManyOptions<Logging>): Promise<Logging[]> {
    return this.repository.find(options);
  }

}
