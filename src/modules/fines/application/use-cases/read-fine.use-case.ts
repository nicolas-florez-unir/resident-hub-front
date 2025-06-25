import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';

@injectable()
export class ReadFineUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

    async handle(): Promise<FineEntity[]> {
        try {
        return await this.fineRepository.findAll();
        } catch (error) {
        console.error('[ReadFineUseCase] Error:', error);
        throw new Error('No se pudieron obtener las multas.');
        }
    }

    async handleById(id: string): Promise<FineEntity> {
        try {
        return await this.fineRepository.findById(id);
        } catch (error) {
        console.error('[ReadFineUseCase] Error:', error);
        throw new Error('No se pudo obtener la multa.');
        }
    }
}