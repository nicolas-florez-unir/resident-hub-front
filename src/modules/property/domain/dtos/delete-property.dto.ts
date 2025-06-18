export class DeletePropertyDto {
  constructor(public readonly id: number) {}

  public getId(): number {
    return this.id;
  }
}