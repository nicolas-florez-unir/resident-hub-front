import type { CondominiumEntity } from 'src/modules/condominium/domain/entities/condominium.entity';
import type { UserEntity } from 'src/modules/user/domain/entities';

export class HouseEntity {
  constructor(
    public id: number,
    public houseNumber: string,
    public condominium: CondominiumEntity,
    public owner: UserEntity,
  ) {}

  getId(): number {
    return this.id;
  }

  getHouseNumber(): string {
    return this.houseNumber;
  }

  getCondominium(): CondominiumEntity {
    return this.condominium;
  }

  getOwner(): UserEntity {
    return this.owner;
  }
}
