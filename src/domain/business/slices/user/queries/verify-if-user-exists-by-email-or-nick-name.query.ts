import { IQuery } from '@nestjs/cqrs';

export class VerifyIfUserExistsByEmailOrNickNameQuery implements IQuery {
  constructor(
    public readonly userEmail: string,
    public readonly userNickName: string
  ) { }
}
