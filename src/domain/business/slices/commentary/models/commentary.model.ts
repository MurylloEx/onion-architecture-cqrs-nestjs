import { Column, Entity, ManyToOne } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';

import { DomainModel } from 'src/domain/models';
import { User } from 'src/domain/business/slices/user/models';
import { Post } from 'src/domain/business/slices/feed/models';

@Entity()
export class Commentary extends DomainModel {

  @MinLength(4)
  @MaxLength(512)
  @Column()
  public text: string;

  @ManyToOne(() => User, (user) => user.commentaries)
  public user: User;

  @ManyToOne(() => Post, (post) => post.commentaries)
  public post: Post;

}
