import { inject, injectable } from 'inversify';
import { FineRepository } from '../../domain/repositories/fine.repository';
import { FineEntity } from '../../domain/entities/Fine.entity';
import { CreateFineDto } from '../../domain/dtos/create-fine.dto';

@injectable()
export class CreateFineUseCase {    
  constructor(
    @inject(FineRepository)
    private readonly fineRepository: FineRepository,
  ) {}

  async handle(dto: CreateFineDto): Promise<FineEntity> {
    try {
      return await this.fineRepository.create(dto);
    } catch (error) {
      console.error('[CreateFineUseCase] Error:', error);
      throw new Error('No se pudo crear la multa.');
    }
  }
}    
