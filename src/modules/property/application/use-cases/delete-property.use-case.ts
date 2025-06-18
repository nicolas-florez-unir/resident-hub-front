import { inject, injectable } from 'inversify';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { DeletePropertyDto } from '../../domain/dtos/delete-property.dto'; 

@injectable()
export class DeletePropertyUseCase {    
  constructor(
    @inject(PropertyRepository)
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async handle(dto: DeletePropertyDto): Promise<void> {
    try {
      await this.propertyRepository.delete(dto.getId());
    } catch (error) {
      console.error('[DeletePropertyUseCase] Error:', error);
      throw new Error('No se pudo eliminar la propiedad.');
    }
  }
}