import type { CondominiumDto } from 'src/modules/condominium/infrastructure/dtos';
import type { UserDto } from 'src/modules/user/domain/dtos';

export interface HouseDto {
  id: number;
  houseNumber: string;
  owner: UserDto;
  condominium: CondominiumDto;
  createdAt: Date;
  updatedAt: Date;
}
