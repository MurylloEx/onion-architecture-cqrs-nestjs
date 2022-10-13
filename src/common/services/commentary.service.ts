import { Injectable } from '@nestjs/common';
import { CommentaryDto, UserDto } from 'src/common';
import { CommentaryDomainService } from 'src/domain';

@Injectable()
export class CommentaryService {
  
  constructor(
    private readonly commentaryDomainService: CommentaryDomainService
  ) {}

  async create(userId: string, postId: string, text: string) {
    const entity = await this.commentaryDomainService.create(userId, postId, text);
    const transferObject = entity.toDto(CommentaryDto);

    transferObject.user = entity.user.toDto(UserDto);

    return transferObject;
  }

  async fetchByPostId(postId: string) {
    const entities = await this.commentaryDomainService.fetchByPostId(postId);

    return entities.map(entity => {
      const transferObject = entity.toDto(CommentaryDto);

      transferObject.user = entity.user.toDto(UserDto);
  
      return transferObject;
    });
  }

}
