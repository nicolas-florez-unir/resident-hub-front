export class CreateFineDto {
  constructor(
    private readonly id: string,
    private readonly typeFine: string,
    private readonly userId: number,
    private readonly amount: number,
    private readonly description: string,
    private readonly status: string,
    private readonly createdAt: Date,    
  ) {}

  public getId(): string {
    return this.id;
  }

    public getTypeFine(): string {
        return this.typeFine;
    }

  public getUserId(): number {
    return this.userId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): string {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

}