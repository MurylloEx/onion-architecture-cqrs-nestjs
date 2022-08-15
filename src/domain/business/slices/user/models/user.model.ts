import { Column, Entity } from 'typeorm';
import { DomainModel } from 'src/domain/models';

@Entity()
export class User extends DomainModel {

  @Column()
  public fullName: string;

  @Column()
  public nickName: string;

  @Column()
  public phone: string;
  
  @Column()
  public email: string;
  
  @Column()
  public password: string;
  
  @Column()
  public pushToken: string;

  @Column()
  public pictureId: string;

}
