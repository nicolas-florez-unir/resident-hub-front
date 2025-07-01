import { inject, injectable } from 'inversify';
import { HouseRepository } from '../../domain/repositories/house.repository';
import { HouseEntity } from '../../domain/entities/house.entity';

@injectable()
export class GetHousesByCondominiumUseCase {
  constructor(@inject(HouseRepository) private readonly houseRepository: HouseRepository) {}

  async execute(): Promise<HouseEntity[]> {
    return await this.houseRepository.getByCondominium();
  }
}
