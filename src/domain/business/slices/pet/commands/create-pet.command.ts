import { ICommand } from '@nestjs/cqrs';

export class CreatePetCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly species: string,
    public readonly breed: string,
    public readonly place: string,
    public readonly color: string,
    public readonly sex: string,
    public readonly age: number,
    public readonly description: string,
    public readonly habits: string,
    public readonly allergies: string,
    public readonly fears: string,
    public readonly pictureBuffer: Buffer
  ) { }
}
