import type { HouseEntity } from 'src/modules/house/domain/entities/house.entity';
import type { Currency } from '../enums/currency.enum';
import type { FineStatus } from '../enums/fine-status.enum';
import type { FineType } from '../enums/fine-type.enum';

export class FineEntity {
  constructor(
    private readonly id: string,
    private readonly type: FineType,
    private readonly house: HouseEntity,
    private readonly issuedDate: Date,
    private readonly currency: Currency,
    private readonly amount: number,
    private readonly reason: string,
    private readonly status: FineStatus,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getHouse(): HouseEntity {
    return this.house;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getTypeFine(): FineType {
    return this.type;
  }

  public getIssuedDate(): Date {
    return this.issuedDate;
  }

  public getCurrency(): Currency {
    return this.currency;
  }

  public getStatus(): FineStatus {
    return this.status;
  }

  public getReason(): string {
    return this.reason;
  }
}
