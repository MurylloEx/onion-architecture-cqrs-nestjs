import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand } from '@nestjs/cqrs';
import { Bucket } from 'src/domain/business/slices/bucket/models';
import { CreateBucketCommand } from 'src/domain/business/slices/bucket/commands';

import { 
  BucketActionType, 
  BucketType, 
  ImgurCreateResponse, 
  ImgurReadResponse, 
  ImgurRemoveResponse, 
  ImgurUpdateResponse
} from 'src/domain/business/slices/bucket/types';

import { ImgurBucketDomainService } from './imgur-bucket-domain.service';

@Injectable()
export class BucketDomainService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly imgurBucketDomainService: ImgurBucketDomainService
  ) { }

  async createImage(
    buffer: Buffer, 
    title: string, 
    description: string
  ): Promise<ImgurCreateResponse> 
  {
    const result = await this.imgurBucketDomainService.create(buffer, title, description);
    const command = new CreateBucketCommand(
      BucketType.Imgur,
      BucketActionType.Create,
      result.id,
      result.token
    );
    await this.commandBus.execute<ICommand, Bucket>(command);
    return result;
  }

  async readImage(id: string): Promise<ImgurReadResponse>
  {
    const result = await this.imgurBucketDomainService.read(id);
    const command = new CreateBucketCommand(
      BucketType.Imgur,
      BucketActionType.Read,
      result.id,
      result.link
    );
    await this.commandBus.execute<ICommand, Bucket>(command);
    return result;
  }

  async updateImage(
    id: string, 
    token: string, 
    title: string, 
    description: string
  ): Promise<ImgurUpdateResponse>
  {
    const result = await this.imgurBucketDomainService.update(
      id, 
      token, 
      title, 
      description
    );
    const command = new CreateBucketCommand(
      BucketType.Imgur,
      BucketActionType.Update,
      id,
      token
    );
    await this.commandBus.execute<ICommand, Bucket>(command);
    return result;
  }

  async removeImage(id: string, token: string): Promise<ImgurRemoveResponse>
  {
    const result = await this.imgurBucketDomainService.remove(id, token);
    const command = new CreateBucketCommand(
      BucketType.Imgur,
      BucketActionType.Remove,
      result.id,
      result.link
    );
    await this.commandBus.execute<ICommand, Bucket>(command);
    return result;
  }

}
