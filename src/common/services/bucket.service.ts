import { Injectable } from '@nestjs/common';
import { BucketDomainService } from 'src/domain';
import { 
  ImgurCreateResponseDto,
  ImgurReadResponseDto,
  ImgurUpdateResponseDto,
  ImgurRemoveResponseDto
} from 'src/common/dto';

@Injectable()
export class BucketService {
  
  constructor(private readonly bucketDomainService: BucketDomainService) {}

  createImage(
    buffer: Buffer, 
    title: string, 
    description: string
  ): Promise<ImgurCreateResponseDto> 
  {
    return this.bucketDomainService.createImage(buffer, title, description);
  }

  readImage(
    id: string
  ): Promise<ImgurReadResponseDto>
  {
    return this.bucketDomainService.readImage(id);
  }

  updateImage(
    id: string, 
    token: string, 
    title: string, 
    description: string
  ): Promise<ImgurUpdateResponseDto>
  {
    return this.bucketDomainService.updateImage(id, token, title, description);
  }

  removeImage(
    id: string, 
    token: string
  ): Promise<ImgurRemoveResponseDto>
  {
    return this.bucketDomainService.removeImage(id, token);
  }

}
