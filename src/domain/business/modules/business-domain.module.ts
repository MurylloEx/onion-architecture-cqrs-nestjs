import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication.module';
import { BucketModule } from './bucket.module';
import { EstablishmentModule } from './establishment.module';
import { LoggingModule } from './logging.module';
import { MessageModule } from './message.module';
import { NotificationModule } from './notification.module';
import { PetModule } from './pet.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    AuthenticationModule,
    BucketModule,
    EstablishmentModule,
    LoggingModule,
    MessageModule,
    NotificationModule,
    PetModule,
    UserModule
  ],
  exports: [
    AuthenticationModule,
    BucketModule,
    EstablishmentModule,
    LoggingModule,
    MessageModule,
    NotificationModule,
    PetModule,
    UserModule
  ]
})
export class BusinessDomainModule { }
