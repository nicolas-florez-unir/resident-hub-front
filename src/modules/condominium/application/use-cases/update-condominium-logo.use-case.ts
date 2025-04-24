import { inject, injectable } from 'inversify';
import { CondominiumRepository } from '../../domain/repositories/condominium.repository';

@injectable()
export class UpdateCondominiumLogoUseCase {
  constructor(
    @inject(CondominiumRepository) private readonly condominiumRepository: CondominiumRepository,
  ) {}

  async execute(logo: File) {
    await this.condominiumRepository.updateLogo(logo);
  }
}
