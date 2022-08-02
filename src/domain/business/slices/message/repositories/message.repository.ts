import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Message } from 'src/domain/business/slices/message/models';

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

  fetch(): Promise<Message[]> {
    return this.repository.find();
  }

  fetchById(id: string): Promise<Message> {
    return this.repository.findOneByOrFail({ id });
  }

  updateById(id: string, message: Message): Promise<UpdateResult> {
    return this.repository.update(id, message);
  }

  deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
