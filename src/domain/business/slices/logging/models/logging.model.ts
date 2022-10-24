import { Column, Entity } from 'typeorm';
import { DomainModel } from 'src/domain/models';
import { IsDefined, IsIn, IsString } from 'class-validator';
import { LoggingType } from 'src/domain/business/slices/logging/types';

@Entity()
export class Logging extends DomainModel {
  
  @Column()
  @IsString()
  @IsDefined()
  public serviceName: string;

  @Column()
  @IsString()
  @IsDefined()
  public message: string;

  @Column()
  @IsString()
  @IsDefined()
  public description: string;

  @Column()
  @IsString()
  @IsDefined()
  public object: string;

  @Column()
  @IsString()
  @IsDefined()
  public error: string;

  @Column()
  @IsString()
  @IsIn([
    LoggingType.Debug,
    LoggingType.Error,
    LoggingType.Info,
    LoggingType.Silly,
    LoggingType.Verbose,
    LoggingType.Warning
  ])
  public type: LoggingType;

}
