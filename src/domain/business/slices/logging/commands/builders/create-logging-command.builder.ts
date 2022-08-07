import { LoggingType } from 'src/domain/business/slices/logging/types';
import { CreateLoggingCommand } from '../create-logging.command';

export class CreateLoggingCommandBuilder<T> {

  private type: LoggingType;
  private serviceName: string;
  private message: string;
  private description?: string;
  private object?: T;
  private error?: Error;

  withType(value: LoggingType) {
    this.type = value;
    return this;
  }

  withServiceName(value: string) {
    this.serviceName = value;
    return this;
  }

  withMessage(value: string) {
    this.message = value;
    return this;
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withObject(value: T) {
    this.object = value;
    return this;
  }

  withError(value: Error) {
    this.error = value;
    return this;
  }

  build() {
    return new CreateLoggingCommand<T>(
      this.type,
      this.serviceName,
      this.message,
      this.description,
      this.object,
      this.error
    );
  }

}