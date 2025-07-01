import type { UserDto } from 'src/modules/user/domain/dtos';

export interface CondominiumDto {
  id: number;
  name: string;
  logo: null;
  address: string;
  administrator?: UserDto;
}
