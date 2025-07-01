import { inject, injectable } from 'inversify';
import { HouseRepository } from '../../domain/repositories/house.repository';

@injectable()
export class DeleteHouseUseCase {
  constructor(@inject(HouseRepository) private readonly houseRepository: HouseRepository) {}

  async execute(id: number): Promise<void> {
    return await this.houseRepository.delete(id);
  }
}
