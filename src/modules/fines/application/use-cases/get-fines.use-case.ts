import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';

@injectable()
export class GetFinesUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(): Promise<FineEntity[]> {
    try {
      return await this.fineRepository.findAll();
    } catch (error) {
      console.error('[GetFineUseCase] Error:', error);
      throw new Error('No se pudieron obtener las multas.');
    }
  }
}
