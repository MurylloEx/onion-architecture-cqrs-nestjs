import { Column, Entity } from 'typeorm';
import { IsIn, IsString } from 'class-validator';
import { DomainModel } from 'src/domain/models';
import { 
  BucketActionType, 
  BucketType 
} from 'src/domain/business/slices/bucket/types';

@Entity()
export class Bucket extends DomainModel {

  @IsString()
  @IsIn(Object.values(BucketType))
  @Column()
  public type: BucketType;

  @IsString()
  @IsIn(Object.values(BucketActionType))
  @Column()
  public actionType: BucketActionType;

  @IsString()
  @Column()
  public referenceId: string;

  @IsString()
  @Column()
  public extraInfo: string;
  
}
