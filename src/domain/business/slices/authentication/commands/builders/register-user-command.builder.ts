import { RegisterUserCommand } from 'src/domain/business/slices/authentication/commands';

export class RegisterUserCommandBuilder {
  
  private fullName: string;
  private nickName: string;
  private phone: string;
  private email: string;
  private password: string;
  private permissions: string;
  private pushToken: string;

  withFullName(fullName: string): RegisterUserCommandBuilder {
    this.fullName = fullName;
    return this;
  }

  withNickName(nickName: string): RegisterUserCommandBuilder {
    this.nickName = nickName;
    return this;
  }

  withPhone(phone: string): RegisterUserCommandBuilder {
    this.phone = phone;
    return this;
  }

  withEmail(email: string): RegisterUserCommandBuilder {
    this.email = email;
    return this;
  }

  withPassword(password: string): RegisterUserCommandBuilder {
    this.password = password;
    return this;
  }

  withPermissions(permissions: string): RegisterUserCommandBuilder {
    this.permissions = permissions;
    return this;
  }

  withPushToken(pushToken: string): RegisterUserCommandBuilder {
    this.pushToken = pushToken;
    return this;
  }

  build(): RegisterUserCommand {
    return new RegisterUserCommand(
      this.fullName,
      this.nickName,
      this.phone,
      this.email,
      this.password,
      this.permissions,
      this.pushToken,
    );
  }

}
