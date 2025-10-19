import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';

@injectable()
export class GetFinesByUserUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(): Promise<FineEntity[]> {
    try {
      return await this.fineRepository.findByUser();
    } catch (error) {
      console.error('[GetFinesByUserUseCase] Error:', error);
      throw new Error('No se pudieron obtener las multas.');
    }
  }
}
