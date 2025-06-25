import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';
import { UpdateFineDto } from '../../domain/dtos/update-fine.dto';

@injectable()
export class UpdateFineUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(dto: UpdateFineDto): Promise<FineEntity> {
    try {
      return await this.fineRepository.update(dto);
    } catch (error) {
      console.error('[UpdateFineUseCase] Error:', error);
      throw new Error('No se pudo actualizar la multa.');
    }
  }
}