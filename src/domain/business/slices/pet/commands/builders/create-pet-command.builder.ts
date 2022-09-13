import { CreatePetCommand } from 'src/domain/business/slices/pet/commands';

export class CreatePetCommandBuilder {

  private userId: string;
  private name: string = 'Não informado';
  private species: string = 'Não informado';
  private breed: string = 'Não informado';
  private place: string = 'Não informado';
  private color: string = 'Não informado';
  private sex: string = 'Não informado';
  private age: number = 0;
  private description: string = 'Não há descrição';
  private habits: string = 'Não informado';
  private allergies: string = 'Não informado';
  private fears: string = 'Não informado';
  private pictureBuffer: Buffer = Buffer.from([]);

  withUserId(value: string) {
    this.userId = value;
    return this;
  }

  withName(value: string) {
    this.name = value;
    return this;
  }

  withSpecies(value: string) {
    this.species = value;
    return this;
  }

  withBreed(value: string) {
    this.breed = value;
    return this;
  }

  withPlace(value: string) {
    this.place = value;
    return this;
  }

  withColor(value: string) {
    this.color = value;
    return this;
  }

  withSex(value: string) {
    this.sex = value;
    return this;
  }

  withAge(value: number) {
    this.age = value;
    return this;
  }

  withDescription(value: string) {
    this.description = value;
    return this;
  }

  withHabits(value: string) {
    this.habits = value;
    return this;
  }

  withAllergies(value: string) {
    this.allergies = value;
    return this;
  }

  withFears(value: string) {
    this.fears = value;
    return this;
  }

  withPictureBuffer(value: Buffer) {
    this.pictureBuffer = value;
    return this;
  }

  build(): CreatePetCommand {
    return new CreatePetCommand(
      this.userId,
      this.name,
      this.species,
      this.breed,
      this.place,
      this.color,
      this.sex,
      this.age,
      this.description,
      this.habits,
      this.allergies,
      this.fears,
      this.pictureBuffer
    );
  }

}
