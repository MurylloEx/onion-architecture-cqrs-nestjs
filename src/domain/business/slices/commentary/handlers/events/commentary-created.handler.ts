import * as dayjs from 'dayjs';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CommentaryCreatedEvent } from 'src/domain/business/slices/commentary/events';
import { CommentaryDomainService } from 'src/domain/business/slices/commentary/services';
import { EmailNotificationDomainService } from 'src/domain/business/slices/notification/services';

@EventsHandler(CommentaryCreatedEvent)
export class CommentaryCreatedHandler implements IEventHandler<CommentaryCreatedEvent> {

  constructor(
    private readonly commentaryDomainService: CommentaryDomainService,
    private readonly emailNotificationDomainService: EmailNotificationDomainService
  ) {}

  async handle(event: CommentaryCreatedEvent) {
    const post = event.post;
    const commentary = event.commentary;
    
    const remainingMinutes = dayjs().minute() % 30;
    const remainingMinutesHour = dayjs().minute() % 60;

    const endDate = dayjs()
      .subtract(remainingMinutes, 'minutes')
      .add(30, 'minutes')
      .toDate();

    const startDate = dayjs(endDate)
      .subtract(30, 'minutes')
      .toDate();
    
    const lastHourEndDate = dayjs()
      .subtract(remainingMinutesHour, 'minutes')
      .add(1, 'hour')
      .toDate();

    const lastHourStartDate = dayjs(lastHourEndDate)
      .subtract(1, 'hour')
      .toDate();

    const lastAmountOfSenders = await this.commentaryDomainService.countByPeriodAndPostId(
      post.id, 
      startDate, 
      endDate
    );

    if (lastAmountOfSenders != 5) {
      return;
    }

    const lastHourAmountOfSenders = await this.commentaryDomainService.countByPeriodAndPostId(
      post.id, 
      lastHourStartDate, 
      lastHourEndDate
    );

    this.emailNotificationDomainService.sendCommentaryEmail(
      post.user.id, 
      post.user.fullName,
      commentary.user.fullName,
      post.pet.name,
      lastHourAmountOfSenders
    );
  }

}
