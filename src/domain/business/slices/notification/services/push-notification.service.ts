import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { UserDomainService } from 'src/domain/business/slices/user';

@Injectable()
export class PushNotificationDomainService {

  constructor(private readonly userDomainService: UserDomainService) {}

  async sendPushNotification(userId: string, message: ExpoPushMessage): Promise<ExpoPushTicket[]> {
    const user = await this.userDomainService.fetchById(userId);

    const expo = new Expo({ accessToken: '<accessToken>' });
    const chunks = expo.chunkPushNotifications([{
      ...message,
      to: user.pushToken
    }]);

    const pushTickets: ExpoPushTicket[][] = await Promise.all(
      chunks.map(async (chunk) => {
        try {
          return await expo.sendPushNotificationsAsync(chunk);
        } catch (error) {
          return [];
        }
      })
    );

    return pushTickets.flat();
  }
  
}
