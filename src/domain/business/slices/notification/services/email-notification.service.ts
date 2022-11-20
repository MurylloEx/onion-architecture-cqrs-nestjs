import { Injectable } from '@nestjs/common';
import { Mailer, MailerResponse, MailerSandboxResult } from '@muryllo/mailer';
import { ConfigurationDomainService } from 'src/domain/config';
import { UserDomainService } from 'src/domain/business/slices/user';
import { LoggingDomainService } from 'src/domain/business/slices/logging';

@Injectable()
export class EmailNotificationDomainService {

  private readonly smtpKey: string;
  private readonly smtpSandbox: boolean;
  private readonly smtpFromName: string;
  private readonly smtpFromEmail: string;

  constructor(
    private readonly loggingService: LoggingDomainService,
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
    this.loggingService.verbose(
      'Email sent to sandbox',
      'This email was sandboxed and not sent to the recipient.' +
      'To send properly this email, set SMTP_SANDBOX to false.',
      {
        sender: result.sender,
        to: result.to,
        subject: result.subject,
        mjmlTemplate: result.mjmlTemplatePath,
        textTemplate: result.textTemplatePath,
        text: result.text_body,
        values: result.values,
      }
    );
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
      .sandbox(this.smtpSandbox, (result) => this.sandboxCallback(result));
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

}
