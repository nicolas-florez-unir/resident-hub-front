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

  async execute(dto: UpdateFineDto): Promise<FineEntity> {
    return await this.fineRepository.update(dto);
  }
}
