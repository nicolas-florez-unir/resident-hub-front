import type { HouseDto } from 'src/modules/house/infrastructure/dtos/house.dto';
import type { Currency } from '../enums/currency.enum';
import type { FineStatus } from '../enums/fine-status.enum';
import type { FineType } from '../enums/fine-type.enum';

export interface FineDto {
  id: string;
  type: FineType;
  house: HouseDto;
  issuedDate: Date;
  currency: Currency;
  amount: number;
  reason: string;
  status: FineStatus;
}
