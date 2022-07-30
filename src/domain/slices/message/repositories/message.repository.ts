import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from 'src/domain/slices/message/models';

@Injectable()
export class MessageRepository {

  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  create(title: string, description: string): Promise<Message> {
    const message = this.repository.create({ title, description });
    return this.repository.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.repository.find();
  }

}
