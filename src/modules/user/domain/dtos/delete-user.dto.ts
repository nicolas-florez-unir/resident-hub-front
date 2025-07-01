export class DeleteUserDto {
  constructor(public readonly id: number) {}

  public getId(): number {
    return this.id;
  }
}
