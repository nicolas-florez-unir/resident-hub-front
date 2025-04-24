import { inject, injectable } from 'inversify';
import { CondominiumRepository } from '../../domain/repositories/condominium.repository';

@injectable()
export class GetCondominiumInfoUseCase {
  constructor(
    @inject(CondominiumRepository) private readonly condominiumRepository: CondominiumRepository,
  ) {}

  async execute() {
    return this.condominiumRepository.getInfo();
  }
}
