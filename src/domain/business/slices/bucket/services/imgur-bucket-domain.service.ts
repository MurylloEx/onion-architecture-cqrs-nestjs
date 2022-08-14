import { ImgurClient } from 'imgur';
import { Inject, Injectable } from '@nestjs/common';
import { BucketConfig, BucketConfigType } from 'src/domain/config';

import { 
  ImgurCreateResponse,
  ImgurReadResponse,
  ImgurUpdateResponse,
  ImgurRemoveResponse
} from 'src/domain/business/slices/bucket/types';

import { 
  CreateImgurResourceDomainException, 
  ReadImgurResourceDomainException, 
  RemoveImgurResourceDomainException, 
  UpdateImgurResourceDomainException
} from 'src/domain/business/slices/bucket/exceptions';

@Injectable()
export class ImgurBucketDomainService {

  private readonly imgurClient: ImgurClient;

  constructor(
    @Inject(BucketConfig.KEY)
    protected readonly bucketConfig: BucketConfigType
  ) {
    this.imgurClient = new ImgurClient({
      clientId: bucketConfig.imgur.id,
      clientSecret: bucketConfig.imgur.secret
    });
  }
  
  async create(
    buffer: Buffer, 
    title?: string, 
    description?: string
  ): Promise<ImgurCreateResponse>
  {
    const {
      data: {
        id,
        datetime,
        deletehash,
        link
      },
      success
    } = await this.imgurClient.upload({
      image: buffer,
      type: 'stream',
      title,
      description
    });
  
    if (!success) {
      throw new CreateImgurResourceDomainException();
    }
    
    return {
      id,
      title,
      description,
      datetime,
      token: deletehash ?? '',
      link
    };
  }
  
  async read(id: string): Promise<ImgurReadResponse> 
  {
    const {
      data: {
        title,
        description,
        datetime,
        link
      },
      success
    } = await this.imgurClient.getImage(id);
  
    if (!success) {
      throw new ReadImgurResourceDomainException();
    }
    
    return {
      id,
      title,
      description,
      datetime,
      link
    };
  }
  
  async update(
    id: string,
    token: string,
    title?: string, 
    description?: string
  ): Promise<ImgurUpdateResponse>
  {
    const {
      link,
      datetime
    } = await this.read(id);
  
    const { success, data } = await this.imgurClient.updateImage({
      imageHash: token,
      title,
      description
    });
  
    if (!success || !data) {
      throw new UpdateImgurResourceDomainException();
    }
    
    return {
      id,
      title,
      description,
      datetime,
      link
    };
  }
  
  async remove(
    id: string,
    token: string
  ): Promise<ImgurRemoveResponse>
  {
    const {
      title,
      description,
      datetime,
      link
    } = await this.read(id);
  
    const { success, data } = await this.imgurClient.deleteImage(token);
  
    if (!success || !data) {
      throw new RemoveImgurResourceDomainException();
    }
  
    return {
      id,
      title,
      description,
      datetime,
      link
    };
  }

}
