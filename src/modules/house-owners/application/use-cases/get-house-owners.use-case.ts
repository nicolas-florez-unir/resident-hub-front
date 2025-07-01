import { inject } from 'inversify';
import { HouseOwnerRepository } from '../../domain/repositories/house-owner.repository';

export class GetHouseOwnersUseCase {
  constructor(
    @inject(HouseOwnerRepository)
    private readonly condominiumRepository: HouseOwnerRepository,
  ) {}

  public handle() {
    return this.condominiumRepository.getManyByCondominium();
  }
}
