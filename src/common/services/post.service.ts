import { Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PostDomainService, PostType } from 'src/domain';
import { CreatePostDto, PetDto, PostDto, PostFilterRuleDto, UpdatePostDto, UserDto } from 'src/common/dto';

@Injectable()
export class PostService {

  constructor(
    private readonly postDomainService: PostDomainService
  ) { }

  async create(post: CreatePostDto): Promise<PostDto> {
    const entity = await this.postDomainService.create(
      <PostType>post.type,
      post.pictureBuffer,
      post.localization,
      post.description,
      post.lostDate,
      post.lostReward,
      post.lostCircumstance
    );
    
    const transferObject = entity.toDto(PostDto);

    transferObject.user = entity.user.toDto(UserDto);
    transferObject.pet = entity.pet.toDto(PetDto);

    return transferObject;
  }

  async deleteById(id: string): Promise<PostDto> {
    const entity = await this.postDomainService.deleteById(id);
    const transferObject = entity.toDto(PostDto);

    transferObject.user = entity.user.toDto(UserDto);
    transferObject.pet = entity.pet.toDto(PetDto);

    return transferObject;
  }

  async reportById(id: string): Promise<PostDto> {
    const entity = await this.postDomainService.reportById(id);
    const transferObject = entity.toDto(PostDto);

    transferObject.user = entity.user.toDto(UserDto);
    transferObject.pet = entity.pet.toDto(PetDto);

    return transferObject;
  }

  async updateById(id: string, post: Partial<UpdatePostDto>): Promise<PostDto> {
    const entity = await this.postDomainService.updateById(id, post);
    const transferObject = entity.toDto(PostDto);

    transferObject.user = entity.user.toDto(UserDto);
    transferObject.pet = entity.pet.toDto(PetDto);

    return transferObject;
  }

  async fetchFilterRules(): Promise<PostFilterRuleDto[]> {
    const entities = await this.postDomainService.fetchFilterRules();
    return entities.map(entity => entity.toDto(PostFilterRuleDto));
  }

  async fetchByFilter(filter: string = '', type: string = ''): Promise<PostDto[]> {
    const entities = await this.postDomainService.fetch({
      where: {
        type: <PostType>type,
        description: Like(`%${filter}%`),
        lostCircumstance: Like(`%${filter}%`)
      }
    });

    return entities.map(entity => entity.toDto(PostDto));
  }

  async fetchById(id: string): Promise<PostDto> {
    const entity = await this.postDomainService.fetchById(id);
    const transferObject = entity.toDto(PostDto);

    transferObject.user = entity.user.toDto(UserDto);
    transferObject.pet = entity.pet.toDto(PetDto);

    return transferObject;
  }

  async fetch(): Promise<PostDto[]> {
    const entities = await this.postDomainService.fetch({
      relations: ['user', 'pet']
    });

    return entities.map(entity => {
      const transferObject = entity.toDto(PostDto);

      transferObject.user = entity.user.toDto(UserDto);
      transferObject.pet = entity.pet.toDto(PetDto);
  
      return transferObject;
    });
  }

  async fetchByUserId(id: string): Promise<PostDto[]> {
    const entities = await this.postDomainService.fetch({
      where: {
        user: { id }
      },
      relations: ['user', 'pet']
    });

    return entities.map(entity => {
      const transferObject = entity.toDto(PostDto);

      transferObject.user = entity.user.toDto(UserDto);
      transferObject.pet = entity.pet.toDto(PetDto);
  
      return transferObject;
    });
  }

}
