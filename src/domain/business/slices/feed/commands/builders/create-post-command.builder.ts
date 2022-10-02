import { PostType } from 'src/domain/business/slices/feed/types';
import { CreatePostCommand } from 'src/domain/business/slices/feed/commands';

export class CreatePostCommandBuilder {

  private petId?: string;
  private userId?: string;
  private type?: PostType;
  private pictureBuffer?: Buffer;
  private localization?: string;
  private description?: string;
  private lostDate?: Date;
  private lostReward?: number;
  private lostCircumstance?: string;

  withPetId(value: string) {
    this.petId = value;
    return this;
  }

  withUserId(value: string) {
    this.userId = value;
    return this;
  }

  withType(value: PostType) {
    this.type = value;
    return this;
  }

  withPictureBuffer(value: Buffer) {
    this.pictureBuffer = value;
    return this;
  }

  withLocalization(value: string) {
    this.localization = value;
    return this;
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withLostDate(value: Date) {
    this.lostDate = value;
    return this;
  }

  withLostReward(value: number) {
    this.lostReward = value;
    return this;
  }

  withLostCircumstance(value: string) {
    this.lostCircumstance = value;
    return this;
  }

  build() {
    return new CreatePostCommand(
      this.petId,
      this.userId,
      this.type,
      this.pictureBuffer,
      this.localization,
      this.description,
      this.lostDate,
      this.lostReward,
      this.lostCircumstance
    );
  }

}