import { inject, injectable } from 'inversify';
import { HouseRepository } from '../../domain/repositories/house.repository';
import { HouseEntity } from '../../domain/entities/house.entity';

@injectable()
export class UpdateHouseUseCase {
  constructor(@inject(HouseRepository) private readonly houseRepository: HouseRepository) {}

  async execute(id: number, houseNumber: string, ownerId: number): Promise<HouseEntity> {
    return await this.houseRepository.update(id, houseNumber, ownerId);
  }
}
