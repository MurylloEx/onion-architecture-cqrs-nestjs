import { Column, Entity } from 'typeorm';
import { DomainModel } from 'src/domain/models';

@Entity()
export class Message extends DomainModel {

  @Column()
  public title: string;

  @Column()
  public description: string;
  
}
