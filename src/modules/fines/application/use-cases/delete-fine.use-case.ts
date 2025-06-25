import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { DeleteFineDto } from '../../domain/dtos/delete-fine.dto';

@injectable()
export class DeleteFineUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(dto: DeleteFineDto): Promise<void> {
    try {
        await this.fineRepository.delete(dto.getId().toString());
    } catch (error) {
      console.error('[DeleteFineUseCase] Error:', error);
      throw new Error('No se pudo eliminar la multa.');
    }
  }
}