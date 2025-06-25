export class DeleteFineDto {
  constructor(public readonly id: string) {}

  public getId(): string {
    return this.id;
  }
}