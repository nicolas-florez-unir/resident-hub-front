import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';

@injectable()
export class DeleteFineUseCase {
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(id: number): Promise<void> {
    try {
      await this.fineRepository.delete(id);
    } catch (error) {
      console.error('[DeleteFineUseCase] Error:', error);
      throw new Error('No se pudo eliminar la multa.');
    }
  }
}
