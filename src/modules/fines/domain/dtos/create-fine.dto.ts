import type { Currency } from '../enums/currency.enum';
import type { FineStatus } from '../enums/fine-status.enum';
import type { FineType } from '../enums/fine-type.enum';

export interface CreateFineDto {
  type: FineType;
  houseId: number;
  issuedDate: Date;
  currency: Currency;
  amount: number;
  status: FineStatus;
  reason: string;
}
