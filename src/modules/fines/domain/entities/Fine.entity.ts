export class FineEntity {
  constructor(
    private readonly id: string,
    private readonly typeFine: string,
    private readonly userId: string,
    private readonly amount: number,
    private readonly description: string,
    private readonly status: 'pending' | 'paid' | 'overdue',
    private readonly createdAt: Date
  ) {}

  

  public getId(): string {
    return this.id;
  }

  public getTypeFine(): string {
    return this.typeFine;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): 'pending' | 'paid' | 'overdue' {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}   
