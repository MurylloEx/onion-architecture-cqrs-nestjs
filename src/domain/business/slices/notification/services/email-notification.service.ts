import { Injectable } from '@nestjs/common';
import { Mailer, MailerResponse, MailerSandboxResult } from '@muryllo/mailer';
import { ConfigurationDomainService } from 'src/domain/config';
import { UserDomainService } from 'src/domain/business/slices/user';

@Injectable()
export class EmailNotificationDomainService {

  private readonly smtpKey: string;
  private readonly smtpSandbox: boolean;
  private readonly smtpFromName: string;
  private readonly smtpFromEmail: string;

  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly configurationDomainService: ConfigurationDomainService
  ) {
    const smtpConfig = this.configurationDomainService.smtp;

    this.smtpKey = smtpConfig.key;
    this.smtpSandbox = smtpConfig.sandbox;
    this.smtpFromName = smtpConfig.from.name;
    this.smtpFromEmail = smtpConfig.from.email;
  }

  private sandboxCallback(result: MailerSandboxResult) {
    console.log(result);
  }

  private getTemplate(templateName: string, extension: string) {
    return `src/assets/templates/${templateName}.template.${extension}`;
  }

  async createMailer(userId: string, templateName: string): Promise<Mailer> {
    const user = await this.userDomainService.fetchById(userId);
    return Mailer.create()
      .key(this.smtpKey)
      .to(user.fullName, user.email)
      .from(this.smtpFromName, this.smtpFromEmail)
      .mjmlTemplate(this.getTemplate(templateName, 'mjml'))
      .textTemplate(this.getTemplate(templateName, 'txt'))
      .sandbox(this.smtpSandbox, this.sandboxCallback);
  }

  async sendWelcomeEmail(
    userId: string, 
    userName: string, 
    confirmationUrl: string
  ): Promise<MailerResponse> {
    const mailer: Mailer = await this.createMailer(userId, 'welcome');
    
    const mail = mailer
      .subject('Bem vindo ao Inclusive Pet!')
      .set('user_name', userName)
      .set('confirmation_url', confirmationUrl);

    return await mail.send();
  }

  async sendRecoveryEmail(
    userId: string, 
    userName: string, 
    recoveryCode: string
  ): Promise<MailerResponse> {
    const mailer: Mailer = await this.createMailer(userId, 'recovery');

    const mail: Mailer = mailer
      .subject('Redefinição de Senha - Inclusive Pet')
      .set('user_name', userName)
      .set('recovery_code', recoveryCode);
    
    return await mail.send();
  }

  async sendVacinationEmail(
    userId: string,
    userName: string,
    remainingDays: number,
    vaccineName: string,
    vaccineDate: string,
    dosageNumber: number,
    dosageName: string,
    dosageDate: string
  ) {
    const mailer: Mailer = await this.createMailer(userId, 'vaccination');

    const mail: Mailer = mailer
      .subject('A vacinação do seu Pet está próxima!')
      .set('user_name', userName)
      .set('remaining_days', remainingDays)
      .set('vaccine_name', vaccineName)
      .set('vaccine_date', vaccineDate)
      .set('dosage_number', dosageNumber)
      .set('dosage_name', dosageName)
      .set('dosage_date', dosageDate);
    
    return mail.send();
  }

}
