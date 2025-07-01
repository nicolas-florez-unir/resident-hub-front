import type { HouseEntity } from '../entities/house.entity';

export abstract class HouseRepository {
  abstract getByCondominium(): Promise<HouseEntity[]>;
  abstract create(houseNumber: string, ownerId: number): Promise<HouseEntity>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, houseNumber: string, ownerId: number): Promise<HouseEntity>;
}
