import { ICommand } from '@nestjs/cqrs';

export class ReportPostCommand implements ICommand {
  constructor(
    public readonly id: string
  ) {}
}
